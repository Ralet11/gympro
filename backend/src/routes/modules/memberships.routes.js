import { Router } from 'express'
import {
  listMemberships,
  createMembership,
  pauseMembership,
  resumeMembership,
  cancelMembership,
} from '../../controllers/membership.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listMembershipsSchema,
  createMembershipSchema,
  pauseMembershipSchema,
  resumeMembershipSchema,
  cancelMembershipSchema,
} from '../../validators/membership.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk']), validate(listMembershipsSchema), listMemberships)
router.post('/', authorize(['admin', 'frontdesk']), validate(createMembershipSchema), createMembership)
router.post('/:id/pause', authorize(['admin', 'frontdesk']), validate(pauseMembershipSchema), pauseMembership)
router.post('/:id/resume', authorize(['admin', 'frontdesk']), validate(resumeMembershipSchema), resumeMembership)
router.post('/:id/cancel', authorize(['admin']), validate(cancelMembershipSchema), cancelMembership)

export default router
