import { Router } from 'express'
import {
  listExercises,
  createExercise,
} from '../../controllers/fitness.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listExercisesSchema,
  createExerciseSchema,
} from '../../validators/fitness.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'coach', 'member']), validate(listExercisesSchema), listExercises)
router.post('/', authorize(['admin', 'coach']), validate(createExerciseSchema), createExercise)

export default router
