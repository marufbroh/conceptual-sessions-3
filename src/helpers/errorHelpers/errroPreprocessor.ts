/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { TErrorResponse } from '../../types/TErrorResponse'
import handleValidationError from './handleValidationError'
import handleDuplicateError from './handleDuplicateError'
import handlerCastError from './handlerCastError'
import GenericError from '../../classes/errorClasses/GenericError'
import handlerGenericError from './handlerGenericError'
import { ZodError } from 'zod'
import handleZodError from './handleZodError'

const errorPreproccesor = (error: any): TErrorResponse => {
  if (error instanceof ZodError) {
    return handleZodError(error)
  } else if (error instanceof mongoose.Error.ValidationError) {
    return handleValidationError(error)
  } else if (error.code && error.code === 11000) {
    return handleDuplicateError(error)
  } else if (error instanceof mongoose.Error.CastError) {
    return handlerCastError(error)
  } else if (error instanceof GenericError) {
    return handlerGenericError(error)
  } else {
    return {
      statusCode: 500,
      status: 'error',
      message: 'Unknown Error',
      issues: [
        {
          path: '',
          message: error.message,
        },
      ],
    }
  }
}

export default errorPreproccesor
