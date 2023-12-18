import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse";

const handleValidationError = (error: mongoose.Error.ValidationError): TErrorResponse => {
    const errorValues = Object.values(error.errors);
    const issues: TErrorIssue[] = []

    errorValues.forEach((errObj) => {
        issues.push({
            path: errObj.path,
            message: errObj.message
        })
    })

    return {
        statusCode: 400,
        status: 'error',
        message: 'Validation Error',
        issues
    }
}

export default handleValidationError;