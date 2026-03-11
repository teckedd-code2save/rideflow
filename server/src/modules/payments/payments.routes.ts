import { Router } from 'express';
import { getAllPayments, getPaymentById } from './payments.controller';

const router = Router();

router.get('/', getAllPayments);
router.get('/:id', getPaymentById);

export default router;
