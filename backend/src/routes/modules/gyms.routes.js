import { Router } from 'express'
import {
  listGyms,
  createGym,
  getGym,
  updateGym,
  listLocations,
  createLocation,
  updateLocation,
  getSettings,
  updateSettings,
} from '../../controllers/gym.controller.js'
import { authenticate, authorize } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import {
  createGymSchema,
  updateGymSchema,
  createLocationSchema,
  updateLocationSchema,
  updateSettingsSchema,
} from '../../validators/gym.validators.js'

const router = Router()

router.use(authenticate)

router.get('/', authorize(['admin']), listGyms)
router.post('/', authorize(['admin']), validate(createGymSchema), createGym)

router.get('/locations', requireTenant, authorize(['admin', 'frontdesk']), listLocations)
router.post('/locations', requireTenant, authorize(['admin']), validate(createLocationSchema), createLocation)
router.patch('/locations/:id', requireTenant, authorize(['admin']), validate(updateLocationSchema), updateLocation)

router.get('/settings', requireTenant, authorize(['admin', 'frontdesk']), getSettings)
router.patch('/settings', requireTenant, authorize(['admin']), validate(updateSettingsSchema), updateSettings)

router.get('/:id', authorize(['admin']), getGym)
router.patch('/:id', authorize(['admin']), validate(updateGymSchema), updateGym)

export default router
