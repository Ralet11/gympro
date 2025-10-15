import * as rewardsService from '../services/rewards.service.js'

export const listBenefits = async (req, res) => {
  const benefits = await rewardsService.listBenefits({ context: req.context, query: req.query })
  res.status(200).json(benefits)
}

export const createBenefit = async (req, res) => {
  const benefit = await rewardsService.createBenefit({ context: req.context, payload: req.body })
  res.status(201).json(benefit)
}

export const updateBenefit = async (req, res) => {
  const benefit = await rewardsService.updateBenefit({
    context: req.context,
    benefitId: req.params.id,
    payload: req.body,
  })
  res.status(200).json(benefit)
}

export const getWallet = async (req, res) => {
  const wallet = await rewardsService.getWallet({ userId: req.user.id })
  res.status(200).json(wallet)
}

export const redeemBenefit = async (req, res) => {
  const result = await rewardsService.redeemBenefit({
    context: req.context,
    payload: { ...req.body, userId: req.user.id },
  })
  res.status(201).json(result)
}

export const listLedger = async (req, res) => {
  const ledger = await rewardsService.listRewardLedger({ userId: req.user.id, query: req.query })
  res.status(200).json(ledger)
}

export const listPartners = async (req, res) => {
  const partners = await rewardsService.listPartners({ context: req.context })
  res.status(200).json({ items: partners })
}

export const createPartner = async (req, res) => {
  const partner = await rewardsService.createPartner({ context: req.context, payload: req.body })
  res.status(201).json(partner)
}
