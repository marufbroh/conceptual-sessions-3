import { Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import sendSuccessResponse from "../utils/sendResponse"
import { authServices } from "../services/auth.service"
import config from "../config"

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.register(req.body)

  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  })
})


const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await authServices.login(req.body)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  })

  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'User logged in successfully',
    data: { accessToken },
  })
})


const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    // const token = req.headers.authorization
    // if (!token) {
    //   throw new Error('Invalid token')
    // }
    // const decodedToken = jwtHelpers.verifyToken(token, config.jwt_access_secret)
    const decodedToken = req.user
    const result = await authServices.changePassword(decodedToken, req.body)

    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Password changed successfully',
      data: result,
    })
  },
)

export const authController = {
  register,
  login,
  changePassword,
  // refreshToken,
}