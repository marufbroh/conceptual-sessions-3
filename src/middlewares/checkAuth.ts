import { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { jwtHelpers } from '../helpers/jwtHelpers'
import catchAsync from '../utils/catchAsync'
import { USER_ROLE } from '../constants/user.constant'
import { NextFunction, Request, Response } from 'express'
import User from '../models/user.model'

const checkAuth = (...roles: Array<keyof typeof USER_ROLE>) => {
  // roles: ['user' | 'admin']
  // roles: ("user" | "admin")[]
  // console.log(roles)
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    // console.log(token)

    if (!token) {
      throw new Error('Invalid token')
    }

    const decodedToken = jwtHelpers.verifyToken(token, config.jwt_access_secret)

    req.user = decodedToken as JwtPayload

    const { email } = decodedToken as JwtPayload

    const user = await User.findOne({ email })

    // Authentication
    if (!user) {
      throw new Error('Invalid email or password')
    }

    //Authorization
    if (!roles.includes(user?.role)) {
      throw new Error('You are not authorized to create user')
    }

    next()
  })
}

export default checkAuth
