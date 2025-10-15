import { Router } from 'express'
import {
  listSessions,
  createSession,
  updateSession,
  deleteSession,
} from '../../controllers/class.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listSessionsSchema,
  createSessionSchema,
  updateSessionSchema,
} from '../../validators/class.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk', 'coach', 'member']), validate(listSessionsSchema), listSessions)
router.post('/', authorize(['admin', 'frontdesk']), validate(createSessionSchema), createSession)
router.patch('/:id', authorize(['admin', 'frontdesk']), validate(updateSessionSchema), updateSession)
router.delete('/:id', authorize(['admin']), deleteSession)

export default router
