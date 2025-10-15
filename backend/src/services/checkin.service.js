import { Op } from 'sequelize'
import AppError from '../utils/appError.js'
import { getModels } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse, applyRange } from '../utils/pagination.js'
import { signAccessToken, verifyAccessToken } from '../utils/jwt.js'

export const listCheckins = async ({ context, query }) => {
  const { Checkin, User } = getModels()
  const pagination = buildPagination(query)
  const range = applyRange(query)

  const where = {
    gymId: context.gymId,
  }

  if (query.userId) {
    where.userId = query.userId
  }

  if (context.locationId) {
    where.locationId = context.locationId
  }

  if (range.from || range.to) {
    where.checkedInAt = {}
    if (range.from) where.checkedInAt[Op.gte] = range.from
    if (range.to) where.checkedInAt[Op.lte] = range.to
  }

  const result = await Checkin.findAndCountAll({
    where,
    include: [{ model: User, attributes: ['id', 'email', 'fullName'] }],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['checkedInAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((row) => ({
        ...row.toJSON(),
        user: row.User,
      })),
      count: result.count,
    },
    pagination,
  )
}

const ensureActiveMembership = async ({ userId }) => {
  const { Membership } = getModels()
  const membership = await Membership.findOne({
    where: { userId, status: 'active' },
  })
  if (!membership) {
    throw new AppError('Membership inactive or missing', {
      statusCode: 403,
      code: 'MEMBERSHIP_INACTIVE',
    })
  }
  return membership
}

export const registerCheckin = async ({ context, payload }) => {
  const { Checkin, User } = getModels()

  const locationId = payload.locationId || context.locationId
  if (!locationId) {
    throw new AppError('Location required', { statusCode: 400, code: 'LOCATION_REQUIRED' })
  }

  const user = await User.findOne({ where: { id: payload.userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  await ensureActiveMembership({ userId: user.id })

  const checkin = await Checkin.create({
    gymId: context.gymId,
    locationId,
    userId: user.id,
    gateId: payload.gateId,
    source: payload.source || 'mobile',
    allowed: true,
  })

  return {
    id: checkin.id,
    allowed: true,
    membership: { status: 'active' },
  }
}

export const generateAccessQr = async ({ context, payload }) => {
  const ttlSeconds = payload.ttlSeconds || 30
  const token = signAccessToken(
    {
      sub: payload.userId,
      gymId: context.gymId,
      locationId: payload.locationId || context.locationId,
      type: 'checkin_qr',
    },
    { expiresIn: `${ttlSeconds}s` },
  )

  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString()
  return { qrToken: token, expiresAt }
}

export const validateAccess = async ({ context, payload }) => {
  const decoded = verifyAccessToken(payload.qrToken)
  if (decoded.type !== 'checkin_qr') {
    throw new AppError('Token invalid', { statusCode: 400, code: 'TOKEN_INVALID' })
  }

  const userId = decoded.sub
  await ensureActiveMembership({ userId })

  return {
    allowed: true,
    reason: null,
    membership: { status: 'active' },
  }
}
