import GenericError from "../../classes/errorClasses/GenericError"
import { TErrorIssue, TErrorResponse } from "../../types/TErrorResponse"

const handlerGenericError = (error: GenericError): TErrorResponse => {
    const issues: TErrorIssue[] = [
      {
        path: '',
        message: error.message,
      },
    ]
  
    return {
      statusCode: error.statusCode,
      status: 'error',
      message: 'Generic Error',
      issues,
    }
  }
  
  export default handlerGenericError;