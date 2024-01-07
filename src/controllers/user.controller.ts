/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { userServices } from '../services/user.service'
import sendSuccessResponse from '../utils/sendResponse'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body
    const result = await userServices.createUser(userData)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'User created successfully',
      data: result,
    })
  } catch (error: any) {
    next()
  }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userServices.getAllUsers()
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Users are retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    next()
  }
}

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await userServices.getSingleUser(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'User is retrieved successfully',
      data: result,
    })
  } catch (error: any) {
    next()
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const userData = req.body
    const result = await userServices.updateUser(id, userData)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'User updated successfully',
      data: result,
    })
  } catch (error: any) {
    next()
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const result = await userServices.deleteUser(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'User deleted successfully',
      data: result,
    })
  } catch (error: any) {
    next()
  }
}

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
