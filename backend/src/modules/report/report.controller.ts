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
    const { title, description, officeId } = req.body;

    if (!title || !description || !officeId) {
      return errorResponse(
        res,
        'Missing required fields',
        400,
        "Missing 'title', 'description', or 'office' in request body"
      );
    }

    const files = req.files as Express.Multer.File[] | undefined;

    const attachments = files
      ? files.map((file) => `/uploads/reports/${file.filename}`)
      : [];

    if (!req.user) {
      return errorResponse(
        res,
        'User not authenticated',
        401,
        'Authentication required to create a report'
      );
    }

    const report = await Report.create({
      title,
      description,
      office: officeId,
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
) => {
  try {
    // TODO: check if this is the proper way to use populate
    // Fetch all reports with user details and office info
    const reports = await Report.find()
      .populate('createdBy', 'email')
      .populate('office', 'name location');
    return successResponse(res, reports, 'Reports fetched successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reportId = req.params.id;

    const report = await Report.findById(reportId)
      .populate('createdBy', 'email')
      .populate('office', 'name location');

    if (!report) {
      return errorResponse(
        res,
        'Report not found',
        404,
        `No report with ID ${reportId}`
      );
    }

    return successResponse(res, report, 'Report fetched successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const deleteReportById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reportId = req.params.id;

    const report = await Report.findByIdAndDelete(reportId);

    if (!report) {
      return errorResponse(
        res,
        'Report not found',
        404,
        `No report with ID ${reportId}`
      );
    }

    return successResponse(res, null, 'Report deleted successfully', 200);
  } catch (error) {
    next(error);
  }
};

// TODO: if report is closed, do not allow status updates
export const updateReportStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reportId = req.params.id;
    const { status, resolution } = req.body;
    const updateData: any = { status };

    if (resolution) {
      updateData.resolution = resolution;
    }

    if (status === 'closed') {
      updateData.closedAt = new Date();
      // Assuming req.user is available via authMiddleware
      if (req.user) {
        updateData.closedBy = req.user.userId;
      }
    }

    const report = await Report.findByIdAndUpdate(reportId, updateData, {
      new: true, // This option returns the modified document. If not set, it returns the original.
    });

    if (!report) {
      return errorResponse(
        res,
        'Report not found',
        404,
        `No report with ID ${reportId}`
      );
    }

    return successResponse(
      res,
      report,
      'Report status updated successfully',
      200
    );
  } catch (error) {
    next(error);
  }
};
