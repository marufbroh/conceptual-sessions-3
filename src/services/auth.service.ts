import { JwtPayload } from "jsonwebtoken"
import { passwordHelpers } from "../helpers/passwordHelpers"
import { IUser } from "../interfaces/user.interface"
import User from "../models/user.model"
import { jwtHelpers } from "../helpers/jwtHelpers"
import config from "../config"

interface IRegister extends Omit<IUser, 'userStatus' | 'role' | 'passwordChangedAt'> { }

const register = async (payload: IRegister) => {
  const password = payload.password;
  //generates random bytes of 16 characters. Hexadecimal number
  //combined random bytes with password
  const hashedPassword = await passwordHelpers.hashPassword(password)

  const result = await User.create({
    ...payload,
    password: hashedPassword,
    userStatus: 'active',
    role: 'user',
  })

  return result
}

interface ILogin {
  email: string
  password: string
}

const login = async (payload: ILogin) => {
  //if the user exists
  const user = await User.findOne({ email: payload.email }).select('+password')

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const plainTextPassword = payload.password
  const hashedPassword = user.password

  const isCorrectPassword = await passwordHelpers.comparePassword(
    plainTextPassword,
    hashedPassword,
  )
  if (!isCorrectPassword) {
    throw new Error('Invalid credentials')
  }

  //JWT - 3 Parts
  //Header - Payload - Signature
  //Header - Algorithm + Type
  //Payload - Data ( email, role, userId, name)
  //Signature - Secret Key

  const jwtPayload: JwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  )

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  )

  return {
    accessToken,
    refreshToken,
  }
}



export const authServices = {
  register,
  login,
  // changePassword,
  // refreshToken,
}