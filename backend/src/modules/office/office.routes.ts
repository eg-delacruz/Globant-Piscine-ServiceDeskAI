import { Router } from 'express';

import { createOffice } from '@modules/office/office.controller';

import { authMiddleware } from '@middlewares/auth.middleware';
import { requireRole } from '@middlewares/role.middleware';

const router = Router();

router.post('/create', authMiddleware, requireRole('super_user'), createOffice);

export default router;
