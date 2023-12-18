/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { TErrorResponse } from "../types/TErrorResponse";
import config from "../config";
import mongoose from "mongoose";
import errorPreproccesor from "../helpers/errorHelpers/errroPreprocessor";

const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {

    let errorResponse: TErrorResponse = {
        statusCode: error.statusCode || 500,
        status: error.status || 'error',
        message: error.message || 'Something went wrong',
        issues: error.issues || [],
    }

    errorResponse = errorPreproccesor(error);


    res.status(errorResponse.statusCode).json({
        status: errorResponse.status,
        message: errorResponse.message,
        issues: errorResponse.issues,
        //only in NODE_ENV=development
        stack: config.node_env === 'development' ? error.stack : undefined,
        // error: error,
    })
}

export default globalErrorHandler;