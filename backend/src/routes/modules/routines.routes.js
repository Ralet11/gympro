import { Router } from 'express'
import {
  listRoutines,
  createRoutine,
  updateRoutine,
  assignRoutine,
  deleteRoutine,
} from '../../controllers/fitness.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listRoutinesSchema,
  createRoutineSchema,
  updateRoutineSchema,
  assignRoutineSchema,
} from '../../validators/fitness.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'coach', 'member']), validate(listRoutinesSchema), listRoutines)
router.post('/', authorize(['admin', 'coach']), validate(createRoutineSchema), createRoutine)
router.patch('/:id', authorize(['admin', 'coach']), validate(updateRoutineSchema), updateRoutine)
router.post('/:id/assign', authorize(['admin', 'coach']), validate(assignRoutineSchema), assignRoutine)
router.delete('/:id', authorize(['admin', 'coach']), deleteRoutine)

export default router
