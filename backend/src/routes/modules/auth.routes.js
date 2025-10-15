import { Router } from 'express'
import * as authController from '../../controllers/auth.controller.js'
import { validate } from '../../middlewares/validate.js'
import { authenticate } from '../../middlewares/authenticate.js'
import { loginSchema, registerSchema, refreshSchema } from '../../validators/auth.validators.js'

const router = Router()

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.post('/refresh', validate(refreshSchema), authController.refreshToken)
router.post('/logout', authenticate, authController.logout)
router.get('/me', authenticate, authController.getMe)

export default router
