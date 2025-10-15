import { Router } from 'express'
import { handleStripeWebhook } from '../../controllers/billing.controller.js'

const router = Router()

router.post('/stripe', handleStripeWebhook)

export default router
