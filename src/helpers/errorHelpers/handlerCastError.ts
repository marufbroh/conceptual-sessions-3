import mongoose from 'mongoose'
import { TErrorIssue, TErrorResponse } from '../../types/TErrorResponse'

const handlerCastError = (error: mongoose.Error.CastError): TErrorResponse => {
  const issues: TErrorIssue[] = [
    {
      path: error.path,
      message: error.message,
    },
  ]

  return {
    statusCode: 400,
    status: 'error',
    message: 'Cast Error',
    issues,
  }
}

export default handlerCastError
