import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '@middlewares/auth.middleware';

import { Report } from '@modules/report/report.model';

import { successResponse, errorResponse } from '@utils/response';

export const createReport = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: 'Title and description are required',
      });
    }

    const files = req.files as Express.Multer.File[] | undefined;

    const attachments = files
      ? files.map((file) => `/uploads/reports/${file.filename}`)
      : [];

    if (!req.user) {
      return errorResponse(res, 'User not authenticated', 401);
    }

    const report = await Report.create({
      title,
      description,
      status: 'open',
      createdBy: req.user.userId, // assuming authMiddleware injects this
      attachments,
    });

    return successResponse(res, report, 'Report created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getAllReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const deleteReportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

// TODO: if report is closed, do not allow status updates
export const updateReportStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
