import { Request, Response } from 'express';
import prisma from '../../database/client';

export const getPromos = async (req: Request, res: Response) => {
    try {
        const promos = await prisma.promoCode.findMany({
            orderBy: { created_at: 'desc' }
        });

        res.json(promos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
