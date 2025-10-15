import { Router } from 'express'
import {
  listUsers,
  createUser,
  getUser,
  updateUser,
  updateRoles,
  blockUser,
  unblockUser,
} from '../../controllers/users.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listUsersSchema,
  createUserSchema,
  updateUserSchema,
  updateRolesSchema,
} from '../../validators/users.validators.js'

const router = Router()

router.use(authenticate, requireTenant, authorize(['admin', 'frontdesk']))

router.get('/', validate(listUsersSchema), listUsers)
router.post('/', validate(createUserSchema), createUser)
router.get('/:id', getUser)
router.patch('/:id', validate(updateUserSchema), updateUser)
router.patch('/:id/roles', validate(updateRolesSchema), updateRoles)
router.post('/:id/block', blockUser)
router.delete('/:id/block', unblockUser)

export default router
