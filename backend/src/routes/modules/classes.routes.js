import { Router } from 'express'
import {
  listClasses,
  createClass,
  updateClass,
  deleteClass,
} from '../../controllers/class.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listClassesSchema,
  createClassSchema,
  updateClassSchema,
} from '../../validators/class.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk', 'coach', 'member']), validate(listClassesSchema), listClasses)
router.post('/', authorize(['admin']), validate(createClassSchema), createClass)
router.patch('/:id', authorize(['admin']), validate(updateClassSchema), updateClass)
router.delete('/:id', authorize(['admin']), deleteClass)

export default router
