import { Router } from 'express'
import {
  listPartners,
  createPartner,
} from '../../controllers/rewards.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import { createPartnerSchema } from '../../validators/rewards.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk']), listPartners)
router.post('/', authorize(['admin']), validate(createPartnerSchema), createPartner)

export default router
