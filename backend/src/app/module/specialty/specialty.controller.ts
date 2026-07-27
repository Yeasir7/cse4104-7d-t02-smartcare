import { Request, Response } from "express";
import { specialtyServices } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";


const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const payLoad = req.body;

  const result = await specialtyServices.createSpecialty(payLoad);

  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
});

const getAllSpecialty = catchAsync(async (_req: Request, res: Response) => {
  const result = await specialtyServices.getAllSpecialty();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "specialty retrieve successfully",
    data: result,
  });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await specialtyServices.deleteSpecialty(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "specialty deleted successfully",
    data: result,
  });
});

export const specialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};
