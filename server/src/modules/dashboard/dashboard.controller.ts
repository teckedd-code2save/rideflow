import { Request, Response } from 'express';
import prisma from '../../database/client';
import redis from '../../database/redis';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
    try {
        const CACHE_KEY = 'dashboard:stats';
        const cached = await redis.get(CACHE_KEY);

        if (cached) {
            res.json(JSON.parse(cached));
            return;
        }

        const activeRides = await prisma.rideRequest.count({
            where: { status: 'in_progress' }
        });

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayRides = await prisma.rideRequest.findMany({
            where: {
                created_at: { gte: todayStart }
            }
        });

        const totalRidesToday = todayRides.length;

        // Sum final_fares for completed rides today
        const completedToday = todayRides.filter(r => r.status === 'completed');
        const todayRevenue = completedToday.reduce((sum, r) => sum + Number(r.final_fare || 0), 0);

        const driversOnline = await prisma.driverProfile.count({
            where: { status: 'active' }
        });

        const pendingPayments = await prisma.payment.count({
            where: { status: 'pending' }
        });

        const cancelledToday = todayRides.filter(r => r.status === 'cancelled').length;
        const cancellationRate = totalRidesToday > 0
            ? Math.round((cancelledToday / totalRidesToday) * 100)
            : 0;

        // Revenue chart (Last 7 days dynamic)
        const chart = await getRevenueChartData();

        const responsePayload = {
            stats: {
                activeRides,
                todayRevenue,
                driversOnline,
                cancellationRate,
                totalRidesToday,
                pendingPayments
            },
            chart
        };

        // Cache for 30 Seconds
        await redis.setEx(CACHE_KEY, 30, JSON.stringify(responsePayload));

        res.json(responsePayload);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

async function getRevenueChartData() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const rides = await prisma.rideRequest.findMany({
        where: {
            status: 'completed',
            created_at: { gte: sevenDaysAgo }
        },
        select: {
            created_at: true,
            final_fare: true
        }
    });

    const dailyStats: Record<string, { revenue: number; rides: number }> = {};

    // Initialize last 7 days to 0 to ensure chart continuity
    for (let i = 0; i < 7; i++) {
        const d = new Date(sevenDaysAgo);
        d.setDate(d.getDate() + i);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        dailyStats[dayName] = { revenue: 0, rides: 0 };
    }

    // Populate actual data
    rides.forEach(r => {
        if (!r.created_at) return;
        const dayName = r.created_at.toLocaleDateString('en-US', { weekday: 'short' });
        if (dailyStats[dayName]) {
            dailyStats[dayName].revenue += Number(r.final_fare || 0);
            dailyStats[dayName].rides += 1;
        }
    });

    return Object.keys(dailyStats).map(day => ({
        day,
        revenue: Math.round(dailyStats[day].revenue),
        rides: dailyStats[day].rides
    }));
}
