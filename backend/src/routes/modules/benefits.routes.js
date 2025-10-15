import { Router } from 'express'
import {
  listBenefits,
  createBenefit,
  updateBenefit,
} from '../../controllers/rewards.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listBenefitsSchema,
  createBenefitSchema,
  updateBenefitSchema,
} from '../../validators/rewards.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk', 'member']), validate(listBenefitsSchema), listBenefits)
router.post('/', authorize(['admin']), validate(createBenefitSchema), createBenefit)
router.patch('/:id', authorize(['admin']), validate(updateBenefitSchema), updateBenefit)

export default router
