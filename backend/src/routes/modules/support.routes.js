import { Router } from 'express'
import {
  listTickets,
  createTicket,
  updateTicket,
} from '../../controllers/support.controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { authorize } from '../../middlewares/authenticate.js'
import { validate } from '../../middlewares/validate.js'
import {
  listSupportTicketsSchema,
  createSupportTicketSchema,
  updateSupportTicketSchema,
} from '../../validators/support.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk', 'member']), validate(listSupportTicketsSchema), listTickets)
router.post('/', authorize(['member', 'admin', 'frontdesk']), validate(createSupportTicketSchema), createTicket)
router.patch('/:id', authorize(['admin', 'frontdesk']), validate(updateSupportTicketSchema), updateTicket)

export default router
