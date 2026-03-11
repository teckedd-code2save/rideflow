import { Router } from 'express';
import { getPromos, getPromoById } from './promos.controller';

const router = Router();

router.get('/', getPromos);
router.get('/:id', getPromoById);

export default router;
