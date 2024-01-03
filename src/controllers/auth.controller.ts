import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import sendSuccessResponse from "../utils/sendResponse"
import { authServices } from "../services/auth.service"

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await authServices.register(req.body)
  
    sendSuccessResponse(res, {
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    })
  })

  export const authController = {
    register,
    // login,
    // changePassword,
    // refreshToken,
  }