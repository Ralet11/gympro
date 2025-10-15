import { Router } from 'express'
import {
  listEquipment,
  createEquipment,
  updateEquipment,
  listTickets,
  createTicket,
  updateTicket,
} from '../../controllers/equipment.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listEquipmentSchema,
  createEquipmentSchema,
  updateEquipmentSchema,
  listTicketsSchema,
  createTicketSchema,
  updateTicketSchema,
} from '../../validators/equipment.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk']), validate(listEquipmentSchema), listEquipment)
router.post('/', authorize(['admin']), validate(createEquipmentSchema), createEquipment)
router.get('/tickets', authorize(['admin', 'frontdesk']), validate(listTicketsSchema), listTickets)
router.post('/:id/tickets', authorize(['admin', 'frontdesk', 'coach']), validate(createTicketSchema), createTicket)
router.patch('/tickets/:ticketId', authorize(['admin', 'frontdesk']), validate(updateTicketSchema), updateTicket)
router.patch('/:id', authorize(['admin']), validate(updateEquipmentSchema), updateEquipment)

export default router
