import { Router } from 'express';
import { getRecentRides } from './rides.controller';

const router = Router();

router.get('/recent', getRecentRides);

export default router;
