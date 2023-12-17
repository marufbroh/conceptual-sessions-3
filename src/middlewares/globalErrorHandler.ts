/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { TErrorResponse } from "../types/TErrorResponse";
import config from "../config";
import mongoose from "mongoose";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    // const statusCode = error.statusCode || 500;
    // const message = error.message || "Something went wrong";
    // const status = error.status;

    const errorResponse: TErrorResponse = {
        statusCode: error.statusCode || 500,
        status: error.status || 'error',
        message: error.message || 'Something went wrong',
        issues: error.issues || [],
    }

    if (error instanceof mongoose.Error.ValidationError) {
        errorResponse.statusCode = 400
        errorResponse.status = 'error'
        errorResponse.message = 'Validation Error'
        const errorValues = Object.values(error.errors);

        errorValues.forEach((errObj) => {
            errorResponse.issues.push({
                path: errObj.path,
                message: errObj.message
            })
        })
    };

    res.status(errorResponse.statusCode).json({
        status: errorResponse.status,
        message: errorResponse.message,
        issues: errorResponse.issues,
        //only in NODE_ENV=development
        stack: config.node_env === 'development' ? error.stack : undefined,
        error: error,
    })
}

export default globalErrorHandler;