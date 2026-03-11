import { Router } from 'express';
import { getRecentRides, getRideById } from './rides.controller';

const router = Router();

router.get('/recent', getRecentRides);
router.get('/:id', getRideById);

export default router;
