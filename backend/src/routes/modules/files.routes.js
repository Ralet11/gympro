import { Router } from 'express'
import {
  createUpload,
  deleteFile,
} from '../../controllers/file.controller.js'
import { authenticate } from '../../middlewares/authenticate.js'
import { requireTenant } from '../../middlewares/tenant.js'
import { validate } from '../../middlewares/validate.js'
import { createUploadSchema } from '../../validators/file.validators.js'

const router = Router()

router.use(authenticate, requireTenant)

router.post('/upload', validate(createUploadSchema), createUpload)
router.delete('/:id', deleteFile)

export default router
