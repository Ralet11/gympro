import { Router } from 'express'
import {
  generateAccessQr,
  validateAccess,
} from '../../controllers/checkin.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import { generateQrSchema, validateAccessSchema } from '../../validators/checkin.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.post('/qr', authorize(['admin', 'frontdesk', 'member']), validate(generateQrSchema), generateAccessQr)
router.post('/validate', authorize(['admin', 'frontdesk']), validate(validateAccessSchema), validateAccess)

export default router
