import { Router } from 'express'
import {
  listBookings,
  createBooking,
  cancelBooking,
  checkinBooking,
  confirmWaitlist,
} from '../../controllers/class.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  listBookingsSchema,
  createBookingSchema,
} from '../../validators/class.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/', authorize(['admin', 'frontdesk', 'coach']), validate(listBookingsSchema), listBookings)
router.post('/', authorize(['admin', 'frontdesk', 'member']), validate(createBookingSchema), createBooking)
router.patch('/:id/cancel', authorize(['admin', 'frontdesk', 'member']), cancelBooking)
router.post('/:id/checkin', authorize(['admin', 'frontdesk', 'coach']), checkinBooking)
router.post('/:id/confirm-waitlist', authorize(['admin', 'frontdesk']), confirmWaitlist)

export default router
