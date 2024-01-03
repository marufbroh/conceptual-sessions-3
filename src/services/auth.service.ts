import { IUser } from "../interfaces/user.interface"
import User from "../models/user.model"

interface IRegister
  extends Omit<IUser, 'userStatus' | 'role' | 'passwordChangedAt'> {}

const register = async (payload: IRegister) => {
  const password = payload.password
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



export const authServices = {
    register,
    // login,
    // changePassword,
    // refreshToken,
  }