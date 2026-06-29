import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authServices } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const registerPatient = catchAsync(async(req: Request, res: Response)=>{
    const payload = req.body
    const result = await authServices.registerPatient(payload);
    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: "user registered successfully",
        data: result
    })
})

const logInUser = catchAsync(async(req:Request, res: Response)=>{
    const payload = req.body;
    const result = await authServices.loginUser(payload);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: "user logged in",
        data: result
    })
})

export const authController = {
  registerPatient,
  logInUser,
};