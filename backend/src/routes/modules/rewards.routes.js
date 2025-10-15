import { Router } from 'express'
import {
  getWallet,
  redeemBenefit,
  listLedger,
} from '../../controllers/rewards.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import { redeemBenefitSchema } from '../../validators/rewards.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.get('/wallet', authorize(['admin', 'coach', 'member']), getWallet)
router.get('/ledger', authorize(['admin', 'coach', 'member']), listLedger)
router.post('/redeem', authorize(['admin', 'coach', 'member']), validate(redeemBenefitSchema), redeemBenefit)

export default router
