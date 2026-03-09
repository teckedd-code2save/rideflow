import { Router } from 'express';
import { getDashboardStats } from './dashboard.controller';

const router = Router();

router.get('/', getDashboardStats);

export default router;
