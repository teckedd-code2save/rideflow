import { Request, Response } from 'express';
import prisma from '../../database/client';

export const getRecentRides = async (req: Request, res: Response) => {
    try {
        const rides = await prisma.rideRequest.findMany({
            take: 5,
            orderBy: { created_at: 'desc' },
            include: {
                rider: { select: { full_name: true } },
                driver: { select: { full_name: true } }
            }
        });

        res.json(rides.map(r => ({
            id: r.id,
            rider_name: r.rider.full_name,
            driver_name: r.driver ? r.driver.full_name : null,
            origin_address: r.origin_address,
            dest_address: r.dest_address,
            final_fare: r.final_fare,
            status: r.status,
            created_at: r.created_at
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
