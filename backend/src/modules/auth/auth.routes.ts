import { Router } from 'express';
import { loginController, meController } from '@modules/auth/auth.controller';
import { authMiddleware } from '@middlewares/auth.middleware';

const router = Router();

router.post('/login', loginController);

// Protected route to get current authenticated user's info
// If the user is not authenticated, authMiddleware will respond with 401 Unauthorized
router.get('/me', authMiddleware, meController);

export default router;
