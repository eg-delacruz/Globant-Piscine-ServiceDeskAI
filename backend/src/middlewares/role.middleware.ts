import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { errorResponse } from '@utils/response';

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return errorResponse(res, 'Not authenticated', 401);
    }

    if (!roles.includes(req.user.role)) {
      return errorResponse(res, 'Forbidden', 403);
    }

    next();
  };
};

/*
Used like the auth.middleware in routes to protect routes based on user roles (see auth.middleware.ts file for an example):

router.post(
  '/users',
  authMiddleware,
  requireRole('super_user', 'admin'),
  createUserController
);

*/
