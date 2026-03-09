import { Router } from 'express';
import { getDrivers } from './drivers.controller';

const router = Router();

router.get('/', getDrivers);

export default router;
