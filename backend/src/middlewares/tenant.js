import AppError from '../utils/appError.js'

export const tenantContext = (req, res, next) => {
  req.context = req.context || {}

  const headerGymId = req.headers['x-gym-id']
  const headerLocationId = req.headers['x-location-id']

  req.context.gymId = headerGymId || req.user?.gymId || null
  req.context.locationId = headerLocationId || null

  return next()
}

export const requireTenant = (req, res, next) => {
  if (!req.context?.gymId) {
    return next(new AppError('Gym context required (X-Gym-Id header)', { statusCode: 400, code: 'TENANT_REQUIRED' }))
  }
  return next()
}
