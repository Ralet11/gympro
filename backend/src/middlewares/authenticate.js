import AppError from '../utils/appError.js'
import { verifyAccessToken } from '../utils/jwt.js'
import { getModels } from '../loaders/sequelize.js'

export const authenticate = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError('Authorization header missing', { statusCode: 401, code: 'UNAUTHORIZED' }))
  }

  const token = header.split(' ')[1]

  try {
    const payload = verifyAccessToken(token)
    const { User, Role } = getModels()
    const user = await User.findByPk(payload.sub, {
      include: [{ model: Role, through: { attributes: [] } }],
    })

    if (!user || user.status !== 'active') {
      throw new AppError('User not found or inactive', { statusCode: 401, code: 'UNAUTHORIZED' })
    }

    req.user = {
      id: user.id,
      gymId: user.gymId,
      email: user.email,
      fullName: user.fullName,
      roles: user.Roles ? user.Roles.map((role) => role.key) : [],
    }

    return next()
  } catch (error) {
    if (error instanceof AppError) {
      return next(error)
    }
    return next(new AppError('Invalid token', { statusCode: 401, code: 'UNAUTHORIZED' }))
  }
}

export const authorize = (allowedRoles = []) => (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Unauthorized', { statusCode: 401, code: 'UNAUTHORIZED' }))
  }

  if (allowedRoles.length === 0) {
    return next()
  }

  const userRoles = req.user.roles || []
  const isAllowed = allowedRoles.some((role) => userRoles.includes(role))

  if (!isAllowed) {
    return next(new AppError('Forbidden', { statusCode: 403, code: 'FORBIDDEN' }))
  }

  return next()
}
