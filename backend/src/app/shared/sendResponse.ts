import { Response } from "express";

interface iResponseData<T> {
  httpStatusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

export const sendResponse = <T>(res: Response, responseData: iResponseData<T>) => {
  const { httpStatusCode, success, message, data } = responseData;

  res.status(httpStatusCode).json({
    success,
    message,
    data,
  });
};