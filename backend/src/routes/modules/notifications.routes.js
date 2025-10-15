import { Router } from 'express'
import {
  registerDevice,
  sendTestNotification,
} from '../../controllers/notification.controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import { registerDeviceSchema } from '../../validators/notification.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.post('/register', validate(registerDeviceSchema), registerDevice)
router.post('/test', sendTestNotification)

export default router
