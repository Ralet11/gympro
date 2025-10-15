import { Router } from 'express'
import {
  syncCustomer,
  createPaymentIntent,
  capturePaymentIntent,
  cancelPaymentIntent,
  listInvoices,
  getInvoice,
} from '../../controllers/billing.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  syncCustomerSchema,
  createPaymentIntentSchema,
  listInvoicesSchema,
} from '../../validators/billing.validators.js'

const router = Router()

router.use(authenticate, requireTenant, authorize(['admin', 'frontdesk']))

router.post('/customers/sync', validate(syncCustomerSchema), syncCustomer)
router.post('/payment-intents', validate(createPaymentIntentSchema), createPaymentIntent)
router.post('/payment-intents/:id/capture', capturePaymentIntent)
router.post('/payment-intents/:id/cancel', cancelPaymentIntent)
router.get('/invoices', validate(listInvoicesSchema), listInvoices)
router.get('/invoices/:id', getInvoice)

export default router
