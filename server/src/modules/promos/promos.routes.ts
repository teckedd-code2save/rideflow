import { Router } from 'express';
import { getPromos } from './promos.controller';

const router = Router();

router.get('/', getPromos);

export default router;
