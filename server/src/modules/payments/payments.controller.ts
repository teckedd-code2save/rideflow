import { Request, Response } from 'express';
import prisma from '../../database/client';

export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const payments = await prisma.payment.findMany({
            orderBy: { created_at: 'desc' },
            include: {
                user: { select: { full_name: true } },
                ride_request: { select: { origin_address: true, dest_address: true } }
            }
        });

        res.json(payments.map(p => ({
            id: p.id,
            rider_name: p.user.full_name,
            origin_address: p.ride_request.origin_address,
            dest_address: p.ride_request.dest_address,
            amount: p.amount,
            method: p.method,
            status: p.status,
            gateway_ref: p.gateway_ref,
            paid_at: p.paid_at,
            created_at: p.created_at
        })));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getPaymentById = async (req: Request, res: Response) => {
    try {
        const payment = await prisma.payment.findUnique({
            where: { id: req.params.id as string },
            include: {
                user: { select: { full_name: true } },
                ride_request: { select: { origin_address: true, dest_address: true } }
            }
        });

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.json({
            id: payment.id,
            rider_name: payment.user.full_name,
            origin_address: payment.ride_request.origin_address,
            dest_address: payment.ride_request.dest_address,
            amount: payment.amount,
            method: payment.method,
            status: payment.status,
            gateway_ref: payment.gateway_ref,
            paid_at: payment.paid_at,
            created_at: payment.created_at
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
