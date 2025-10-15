import { Router } from 'express'

import authRoutes from './modules/auth.routes.js'
import userRoutes from './modules/users.routes.js'
import gymRoutes from './modules/gyms.routes.js'
import planRoutes from './modules/plans.routes.js'
import membershipRoutes from './modules/memberships.routes.js'
import checkinRoutes from './modules/checkins.routes.js'
import accessRoutes from './modules/access.routes.js'
import classRoutes from './modules/classes.routes.js'
import classSessionRoutes from './modules/classSessions.routes.js'
import bookingRoutes from './modules/bookings.routes.js'
import exerciseRoutes from './modules/exercises.routes.js'
import routineRoutes from './modules/routines.routes.js'
import workoutRoutes from './modules/workouts.routes.js'
import metricRoutes from './modules/metrics.routes.js'
import benefitRoutes from './modules/benefits.routes.js'
import rewardRoutes from './modules/rewards.routes.js'
import partnerRoutes from './modules/partners.routes.js'
import billingRoutes from './modules/billing.routes.js'
import webhookRoutes from './modules/webhooks.routes.js'
import staffRoutes from './modules/staff.routes.js'
import equipmentRoutes from './modules/equipment.routes.js'
import notificationRoutes from './modules/notifications.routes.js'
import supportRoutes from './modules/support.routes.js'
import fileRoutes from './modules/files.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/gyms', gymRoutes)
router.use('/plans', planRoutes)
router.use('/memberships', membershipRoutes)
router.use('/checkins', checkinRoutes)
router.use('/access', accessRoutes)
router.use('/classes', classRoutes)
router.use('/class-sessions', classSessionRoutes)
router.use('/bookings', bookingRoutes)
router.use('/exercises', exerciseRoutes)
router.use('/routines', routineRoutes)
router.use('/workouts', workoutRoutes)
router.use('/metrics', metricRoutes)
router.use('/benefits', benefitRoutes)
router.use('/rewards', rewardRoutes)
router.use('/partners', partnerRoutes)
router.use('/billing', billingRoutes)
router.use('/webhooks', webhookRoutes)
router.use('/staff', staffRoutes)
router.use('/equipment', equipmentRoutes)
router.use('/notifications', notificationRoutes)
router.use('/support', supportRoutes)
router.use('/files', fileRoutes)

export default router
