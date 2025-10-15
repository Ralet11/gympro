import { Op } from 'sequelize'
import AppError from '../utils/appError.js'
import { getModels, getSequelize } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse } from '../utils/pagination.js'

const addPeriod = (dateString, period) => {
  const date = new Date(dateString)
  switch (period) {
    case 'weekly':
      date.setDate(date.getDate() + 7)
      break
    case 'quarterly':
      date.setMonth(date.getMonth() + 3)
      break
    case 'yearly':
      date.setFullYear(date.getFullYear() + 1)
      break
    default:
      date.setMonth(date.getMonth() + 1)
      break
  }
  return date.toISOString().substring(0, 10)
}

export const listMemberships = async ({ context, query }) => {
  const { Membership, Plan, User } = getModels()
  const pagination = buildPagination(query)
  const where = { '$User.gym_id$': context.gymId }

  if (query.userId) {
    where.userId = query.userId
  }

  if (query.status) {
    where.status = query.status
  }

  const result = await Membership.findAndCountAll({
    where,
    include: [
      { model: Plan },
      { model: User, attributes: ['id', 'email', 'fullName'] },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((m) => ({
        ...m.toJSON(),
        plan: m.Plan,
        user: m.User,
      })),
      count: result.count,
    },
    pagination,
  )
}

export const createMembership = async ({ context, payload }) => {
  const { Membership, Plan, User } = getModels()
  const sequelize = getSequelize()

  const user = await User.findOne({ where: { id: payload.userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found in this gym', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  const plan = await Plan.findOne({ where: { id: payload.planId, gymId: context.gymId } })
  if (!plan) {
    throw new AppError('Plan not found', { statusCode: 404, code: 'PLAN_NOT_FOUND' })
  }

  const hasActive = await Membership.findOne({
    where: {
      userId: user.id,
      status: { [Op.in]: ['active', 'paused'] },
    },
  })

  if (hasActive) {
    throw new AppError('User already has active membership', {
      statusCode: 409,
      code: 'MEMBERSHIP_EXISTS',
    })
  }

  const startDate = payload.startDate || new Date().toISOString().substring(0, 10)
  const renewalDate = addPeriod(startDate, plan.billingPeriod)

  const membership = await sequelize.transaction(async (transaction) => {
    return Membership.create(
      {
        userId: user.id,
        planId: plan.id,
        status: 'active',
        startDate,
        renewalDate,
        meta: payload.meta || {},
      },
      { transaction },
    )
  })

  return membership.toJSON()
}

export const pauseMembership = async ({ membershipId, payload, context }) => {
  const { Membership } = getModels()

  const membership = await Membership.findByPk(membershipId)
  if (!membership) {
    throw new AppError('Membership not found', { statusCode: 404, code: 'MEMBERSHIP_NOT_FOUND' })
  }

  if (membership.status !== 'active') {
    throw new AppError('Only active memberships can be paused', {
      statusCode: 422,
      code: 'INVALID_STATE',
    })
  }

  const pausedFrom = payload.from || new Date().toISOString().substring(0, 10)
  const pausedTo = payload.to || pausedFrom

  await membership.update({
    status: 'paused',
    pausedFrom,
    pausedTo,
    meta: { ...membership.meta, pauseReason: payload.reason },
  })

  return membership.toJSON()
}

export const resumeMembership = async ({ membershipId }) => {
  const { Membership } = getModels()

  const membership = await Membership.findByPk(membershipId)
  if (!membership) {
    throw new AppError('Membership not found', { statusCode: 404, code: 'MEMBERSHIP_NOT_FOUND' })
  }

  await membership.update({
    status: 'active',
    pausedFrom: null,
    pausedTo: null,
  })

  return membership.toJSON()
}

export const cancelMembership = async ({ membershipId, reason }) => {
  const { Membership } = getModels()

  const membership = await Membership.findByPk(membershipId)
  if (!membership) {
    throw new AppError('Membership not found', { statusCode: 404, code: 'MEMBERSHIP_NOT_FOUND' })
  }

  await membership.update({
    status: 'canceled',
    cancelReason: reason || membership.cancelReason,
  })

  return membership.toJSON()
}
