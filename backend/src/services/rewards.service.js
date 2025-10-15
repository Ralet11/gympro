import { Op } from 'sequelize'
import AppError from '../utils/appError.js'
import { getModels, getSequelize } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse } from '../utils/pagination.js'

export const listBenefits = async ({ context, query }) => {
  const { Benefit, Partner } = getModels()
  const pagination = buildPagination(query)
  const where = { gymId: context.gymId }
  if (query.category) where.category = query.category
  if (query.partnerId) where.partnerId = query.partnerId
  if (query.q) where.title = { [Op.iLike]: `%${query.q}%` }

  const result = await Benefit.findAndCountAll({
    where,
    include: [{ model: Partner }],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((benefit) => ({
        ...benefit.toJSON(),
        partner: benefit.Partner,
      })),
      count: result.count,
    },
    pagination,
  )
}

export const createBenefit = async ({ context, payload }) => {
  const { Benefit, Partner } = getModels()
  const partner = await Partner.findOne({ where: { id: payload.partnerId, gymId: context.gymId } })
  if (!partner) {
    throw new AppError('Partner not found', { statusCode: 404, code: 'PARTNER_NOT_FOUND' })
  }

  const benefit = await Benefit.create({
    gymId: context.gymId,
    partnerId: partner.id,
    title: payload.title,
    category: payload.category,
    pointsCost: payload.pointsCost ?? 0,
    stock: payload.stock ?? 0,
    terms: payload.terms,
    active: payload.active ?? true,
  })
  return benefit.toJSON()
}

export const updateBenefit = async ({ context, benefitId, payload }) => {
  const { Benefit } = getModels()
  const benefit = await Benefit.findOne({ where: { id: benefitId, gymId: context.gymId } })
  if (!benefit) {
    throw new AppError('Benefit not found', { statusCode: 404, code: 'BENEFIT_NOT_FOUND' })
  }

  await benefit.update({
    title: payload.title ?? benefit.title,
    category: payload.category ?? benefit.category,
    pointsCost: payload.pointsCost ?? benefit.pointsCost,
    stock: payload.stock ?? benefit.stock,
    terms: payload.terms ?? benefit.terms,
    active: payload.active ?? benefit.active,
  })

  return benefit.toJSON()
}

export const getWallet = async ({ userId }) => {
  const { RewardWallet } = getModels()
  const wallet = await RewardWallet.findOrCreate({
    where: { userId },
    defaults: { points: 0, tier: 'Basic' },
  })
  return wallet[0].toJSON()
}

export const redeemBenefit = async ({ context, payload }) => {
  const { RewardWallet, Benefit, RewardLedger } = getModels()
  const sequelize = getSequelize()

  return sequelize.transaction(async (transaction) => {
    const benefit = await Benefit.findOne({
      where: { id: payload.benefitId, gymId: context.gymId, active: true },
      transaction,
      lock: transaction.LOCK.UPDATE,
    })
    if (!benefit) {
      throw new AppError('Benefit not found', { statusCode: 404, code: 'BENEFIT_NOT_FOUND' })
    }
    if (benefit.stock <= 0) {
      throw new AppError('Benefit out of stock', { statusCode: 409, code: 'BENEFIT_OUT_OF_STOCK' })
    }

    const wallet = await RewardWallet.findOrCreate({
      where: { userId: payload.userId },
      defaults: { points: 0, tier: 'Basic' },
      transaction,
      lock: transaction.LOCK.UPDATE,
    }).then(([record]) => record)

    if (wallet.points < benefit.pointsCost) {
      throw new AppError('Not enough points', { statusCode: 409, code: 'INSUFFICIENT_POINTS' })
    }

    await wallet.update({ points: wallet.points - benefit.pointsCost }, { transaction })
    await benefit.update({ stock: benefit.stock - 1 }, { transaction })

    const ledger = await RewardLedger.create(
      {
        userId: wallet.userId,
        benefitId: benefit.id,
        delta: -benefit.pointsCost,
        reason: 'REDEEM',
        meta: { source: payload.source || 'app' },
      },
      { transaction },
    )

    return {
      redemptionId: ledger.id,
      status: 'confirmed',
      costPoints: benefit.pointsCost,
    }
  })
}

export const listRewardLedger = async ({ userId, query }) => {
  const { RewardLedger, Benefit } = getModels()
  const pagination = buildPagination(query)
  const result = await RewardLedger.findAndCountAll({
    where: { userId },
    include: [{ model: Benefit }],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })
  return paginatedResponse(
    {
      rows: result.rows.map((entry) => ({
        ...entry.toJSON(),
        benefit: entry.Benefit,
      })),
      count: result.count,
    },
    pagination,
  )
}

export const listPartners = async ({ context }) => {
  const { Partner } = getModels()
  return Partner.findAll({ where: { gymId: context.gymId } })
}

export const createPartner = async ({ context, payload }) => {
  const { Partner } = getModels()
  const partner = await Partner.create({
    gymId: context.gymId,
    name: payload.name,
    contactEmail: payload.contactEmail,
    commissionPct: payload.commissionPct ?? 0,
    active: payload.active ?? true,
  })
  return partner.toJSON()
}
