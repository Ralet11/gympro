import { Router } from 'express'
import { logBodyMetric } from '../../controllers/fitness.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import { logBodyMetricSchema } from '../../validators/fitness.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.post('/bodycomp', authorize(['admin', 'coach', 'member']), validate(logBodyMetricSchema), logBodyMetric)

export default router
