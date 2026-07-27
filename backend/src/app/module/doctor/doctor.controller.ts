import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { doctorServices } from "./doctor.service";

const getAllDoctor = catchAsync(async (_req: Request, res: Response) => {
  const result = await doctorServices.getAllDoctor();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor retrieve successfully",
    data: result,
  });
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // Grab the ID from the URL
  const result = await doctorServices.getDoctorById(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor retrieved successfully",
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // Grab the ID from the URL
  const result = await doctorServices.deleteDoctor(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});
const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await doctorServices.updateDoctor(id, payload);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctor updated successfully",
    data: result,
  });
});

export const doctorController = {
  getAllDoctor,
  getDoctorById,
  deleteDoctor,
  updateDoctor,
};
