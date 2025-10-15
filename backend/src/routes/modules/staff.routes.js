import { Router } from 'express'
import {
  listStaff,
  createStaff,
  listShifts,
  createShift,
  updateShift,
} from '../../controllers/staff.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listStaffSchema,
  createStaffSchema,
  listShiftsSchema,
  createShiftSchema,
  updateShiftSchema,
} from '../../validators/staff.validators.js'

const router = Router()

router.use(authenticate, requireTenant, authorize(['admin', 'frontdesk']))

router.get('/', validate(listStaffSchema), listStaff)
router.post('/', validate(createStaffSchema), createStaff)

router.get('/shifts', validate(listShiftsSchema), listShifts)
router.post('/shifts', validate(createShiftSchema), createShift)
router.patch('/shifts/:id', validate(updateShiftSchema), updateShift)

export default router
