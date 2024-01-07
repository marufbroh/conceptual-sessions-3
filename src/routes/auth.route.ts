import express from 'express'
import checkAuth from '../middlewares/checkAuth'
import { authController } from '../controllers/auth.controller'
import { USER_ROLE } from '../constants/user.constant'


const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.patch(
  '/change-password',
  checkAuth(USER_ROLE.admin, USER_ROLE.user),
  authController.changePassword,
)
router.post('/refresh-token', authController.refreshToken)

export const authRoutes = router