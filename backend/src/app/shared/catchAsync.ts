import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn : RequestHandler) =>{
    return async(req: Request, res: Response, next: NextFunction) =>{
        try {
            await fn(req,res,next)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          res.status(500).json({
            success: false,
            message: "failed to fetch",
            data: error.message,
          });
        }
    }
}
