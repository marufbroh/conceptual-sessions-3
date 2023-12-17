/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction)=> {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    const status = error.status;

    res.status(statusCode).json({
        status,
        message
    })
}

export default globalErrorHandler;