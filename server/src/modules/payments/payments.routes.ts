import { Router } from 'express';
import { getAllPayments } from './payments.controller';

const router = Router();

router.get('/', getAllPayments);

export default router;
