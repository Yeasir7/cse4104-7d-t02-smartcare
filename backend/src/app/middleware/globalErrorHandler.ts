/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import status from "http-status";
import z from "zod";
import { handleZodError } from "../errorHelpers/handleZodError";
import { TErrorResponse, TErrorSources } from "../interface/error.interface";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (envVars.NODE_ENV === "development") {
    console.log("Error from global error handler", error);
  }

  let errorSources: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "internal server error";
  let stack: string | undefined = undefined;

  if (error instanceof z.ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = [...simplifiedError.errorSources];
    stack = error.stack;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    stack = error.stack;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = error.message;
    stack = error.stack;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  const errorResponse: TErrorResponse = {
    success: false,
    message: message,
    errorSources,
    stack: envVars.NODE_ENV === "development" ? stack : undefined,
    error: envVars.NODE_ENV === "development" ? error : undefined,
  };

  res.status(statusCode).json(errorResponse);
};
