import slugify from 'slugify'
import AppError from '../utils/appError.js'
import { getModels } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse } from '../utils/pagination.js'

export const listPlans = async ({ context, query }) => {
  const { Plan } = getModels()
  const pagination = buildPagination(query)

  const result = await Plan.findAndCountAll({
    where: { gymId: context.gymId },
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    { rows: result.rows.map((plan) => plan.toJSON()), count: result.count },
    pagination,
  )
}

export const createPlan = async ({ context, payload }) => {
  const { Plan } = getModels()

  const id =
    payload.id ||
    slugify(`${payload.name}-${Date.now()}`, {
      lower: true,
      strict: true,
      trim: true,
    })

  const existing = await Plan.findOne({ where: { id, gymId: context.gymId } })
  if (existing) {
    throw new AppError('Plan id already exists', { statusCode: 409, code: 'PLAN_EXISTS' })
  }

  const plan = await Plan.create({
    id,
    gymId: context.gymId,
    name: payload.name,
    description: payload.description,
    price: payload.price,
    currency: payload.currency || 'ARS',
    billingPeriod: payload.billingPeriod || 'monthly',
    includesJson: payload.includesJson || {},
    active: payload.active ?? true,
  })

  return plan.toJSON()
}

export const updatePlan = async ({ context, planId, payload }) => {
  const { Plan } = getModels()

  const plan = await Plan.findOne({ where: { id: planId, gymId: context.gymId } })
  if (!plan) {
    throw new AppError('Plan not found', { statusCode: 404, code: 'PLAN_NOT_FOUND' })
  }

  await plan.update({
    name: payload.name ?? plan.name,
    description: payload.description ?? plan.description,
    price: payload.price ?? plan.price,
    currency: payload.currency ?? plan.currency,
    billingPeriod: payload.billingPeriod ?? plan.billingPeriod,
    includesJson: payload.includesJson ?? plan.includesJson,
    active: payload.active ?? plan.active,
  })

  return plan.toJSON()
}

export const deletePlan = async ({ context, planId }) => {
  const { Plan, Membership } = getModels()
  const plan = await Plan.findOne({ where: { id: planId, gymId: context.gymId } })
  if (!plan) {
    throw new AppError('Plan not found', { statusCode: 404, code: 'PLAN_NOT_FOUND' })
  }

  const activeMemberships = await Membership.count({
    where: { planId: plan.id, status: ['active', 'paused'] },
  })

  if (activeMemberships > 0) {
    throw new AppError('Plan in use by memberships', { statusCode: 409, code: 'PLAN_IN_USE' })
  }

  await plan.destroy()
}
