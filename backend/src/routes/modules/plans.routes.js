import { Router } from 'express'
import {
  listPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from '../../controllers/plan.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import { createPlanSchema, updatePlanSchema } from '../../validators/plan.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk']), listPlans)
router.post('/', authorize(['admin']), validate(createPlanSchema), createPlan)
router.patch('/:id', authorize(['admin']), validate(updatePlanSchema), updatePlan)
router.delete('/:id', authorize(['admin']), deletePlan)

export default router
