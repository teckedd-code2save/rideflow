import { Request, Response } from 'express';
import prisma from '../../database/client';

export const getDrivers = async (req: Request, res: Response) => {
    try {
        const drivers = await prisma.driverProfile.findMany({
            include: {
                user: { select: { full_name: true, email: true, rating: true } }
            }
        });

        res.json(drivers.map(d => ({
            id: d.id,
            full_name: d.user.full_name,
            rating: d.user.rating,
            vehicle_make: d.vehicle_make,
            vehicle_model: d.vehicle_model,
            status: d.status
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
