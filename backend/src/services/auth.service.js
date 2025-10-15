import AppError from '../utils/appError.js'
import { getModels, getSequelize } from '../loaders/sequelize.js'
import { hashPassword, comparePassword } from '../utils/password.js'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js'

const roleDisplayName = {
  admin: 'Administrador',
  coach: 'Coach',
  frontdesk: 'Front Desk',
  member: 'Miembro',
}

const sanitizeUser = (user) => {
  if (!user) return undefined

  const {
    id,
    email,
    fullName,
    status,
    gymId,
    preferences,
    goalsJson,
  } = user

  return {
    id,
    email,
    fullName,
    status,
    gymId,
    preferences,
    goalsJson,
  }
}

const ensureRoleExists = async (roleKey, transaction) => {
  const { Role } = getModels()
  const [role] = await Role.findOrCreate({
    where: { key: roleKey },
    defaults: {
      name: roleDisplayName[roleKey] || roleKey,
      scopes: [],
    },
    transaction,
  })
  return role
}

export const register = async ({ email, password, fullName, role = 'member', gymId }) => {
  const { User, Gym, UserRole, RewardWallet } = getModels()
  const sequelize = getSequelize()

  const existing = await User.findOne({ where: { email } })
  if (existing) {
    throw new AppError('Email already in use', { statusCode: 409, code: 'EMAIL_TAKEN' })
  }

  const gym = await Gym.findByPk(gymId)
  if (!gym) {
    throw new AppError('Gym not found', { statusCode: 404, code: 'GYM_NOT_FOUND' })
  }

  const passwordHash = await hashPassword(password)

  const result = await sequelize.transaction(async (transaction) => {
    const user = await User.create(
      {
        email,
        passwordHash,
        fullName,
        gymId,
        status: 'active',
      },
      { transaction },
    )

    const roleInstance = await ensureRoleExists(role, transaction)

    await UserRole.create(
      {
        userId: user.id,
        roleId: roleInstance.id,
      },
      { transaction },
    )

    await RewardWallet.findOrCreate({
      where: { userId: user.id },
      defaults: { points: 0, tier: 'Basic' },
      transaction,
    })

    return user
  })

  return sanitizeUser(result.toJSON())
}

export const login = async ({ email, password }) => {
  const { User, Role } = getModels()

  const user = await User.findOne({
    where: { email },
    include: [{ model: Role, through: { attributes: [] } }],
  })

  if (!user) {
    throw new AppError('Email or password incorrect', {
      statusCode: 401,
      code: 'INVALID_CREDENTIALS',
    })
  }

  if (user.status !== 'active') {
    throw new AppError('User is not active', { statusCode: 403, code: 'USER_INACTIVE' })
  }

  const isValid = await comparePassword(password, user.passwordHash)
  if (!isValid) {
    throw new AppError('Email or password incorrect', {
      statusCode: 401,
      code: 'INVALID_CREDENTIALS',
    })
  }

  const roles = user.Roles ? user.Roles.map((role) => role.key) : []

  const accessToken = signAccessToken({
    sub: user.id,
    gymId: user.gymId,
    roles,
  })
  const refreshToken = signRefreshToken({
    sub: user.id,
    gymId: user.gymId,
    roles,
  })

  await user.update({ lastLoginAt: new Date() })

  return {
    accessToken,
    refreshToken,
    user: sanitizeUser(user.toJSON()),
    roles,
  }
}

export const refreshTokens = async ({ refreshToken }) => {
  try {
    const payload = verifyRefreshToken(refreshToken)
    const { User, Role } = getModels()

    const user = await User.findByPk(payload.sub, {
      include: [{ model: Role, through: { attributes: [] } }],
    })

    if (!user || user.status !== 'active') {
      throw new AppError('User inactive or missing', { statusCode: 401, code: 'INVALID_REFRESH' })
    }

    const roles = user.Roles ? user.Roles.map((role) => role.key) : []

    const newAccessToken = signAccessToken({
      sub: user.id,
      gymId: user.gymId,
      roles,
    })

    return {
      accessToken: newAccessToken,
      expiresIn: 3600,
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Refresh token invalid or expired', {
      statusCode: 401,
      code: 'INVALID_REFRESH',
    })
  }
}

export const getProfile = async (userId) => {
  const { User, Role } = getModels()

  const user = await User.findByPk(userId, {
    include: [{ model: Role, through: { attributes: [] } }],
  })

  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  const result = sanitizeUser(user.toJSON())
  result.roles = user.Roles ? user.Roles.map((role) => role.key) : []

  return result
}
