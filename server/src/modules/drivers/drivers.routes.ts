import { Router } from 'express';
import { getDrivers, getDriverById } from './drivers.controller';

const router = Router();

router.get('/', getDrivers);
router.get('/:id', getDriverById);

export default router;
