import { Router } from 'express'
import {
  listCheckins,
  registerCheckin,
} from '../../controllers/checkin.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import { listCheckinsSchema, createCheckinSchema } from '../../validators/checkin.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk']), validate(listCheckinsSchema), listCheckins)
router.post('/', authorize(['admin', 'frontdesk']), validate(createCheckinSchema), registerCheckin)

export default router
