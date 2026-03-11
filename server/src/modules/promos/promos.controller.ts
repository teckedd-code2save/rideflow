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

export const getPromoById = async (req: Request, res: Response) => {
    try {
        const promo = await prisma.promoCode.findUnique({
            where: { id: req.params.id as string }
        });
        
        if (!promo) {
            return res.status(404).json({ error: 'Promo not found' });
        }

        res.json(promo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

