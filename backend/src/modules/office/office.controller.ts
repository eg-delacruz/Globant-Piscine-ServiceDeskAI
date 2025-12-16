import { Request, Response, NextFunction } from 'express';

import { Office } from '@modules/office/office.model';

import { successResponse, errorResponse } from '@utils/response';

export const createOffice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, location, isActive } = req.body;

  if (!name || !location) {
    return errorResponse(res, 'Name and location are required', 400);
  }

  try {
    // Check if the maximum number of offices (10) is reached
    const officeCount = await Office.countDocuments();
    if (officeCount >= 10) {
      return errorResponse(res, 'Maximum number of offices reached (10)', 400);
    }

    const newOffice = new Office({
      name,
      location,
      isActive: isActive !== undefined ? isActive : true,
    });

    const savedOffice = await newOffice.save();

    return successResponse(
      res,
      savedOffice,
      'Office created successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};
