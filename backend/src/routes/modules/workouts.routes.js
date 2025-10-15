import { Router } from 'express'
import {
  listWorkouts,
  createWorkout,
  updateWorkout,
} from '../../controllers/fitness.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listWorkoutsSchema,
  createWorkoutSchema,
  updateWorkoutSchema,
} from '../../validators/fitness.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'coach', 'member']), validate(listWorkoutsSchema), listWorkouts)
router.post('/', authorize(['admin', 'coach', 'member']), validate(createWorkoutSchema), createWorkout)
router.patch('/:id', authorize(['admin', 'coach', 'member']), validate(updateWorkoutSchema), updateWorkout)

export default router
