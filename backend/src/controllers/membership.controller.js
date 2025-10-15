import * as membershipService from '../services/membership.service.js'

export const listMemberships = async (req, res) => {
  const memberships = await membershipService.listMemberships({ context: req.context, query: req.query })
  res.status(200).json(memberships)
}

export const createMembership = async (req, res) => {
  const membership = await membershipService.createMembership({
    context: req.context,
    payload: req.body,
  })
  res.status(201).json(membership)
}

export const pauseMembership = async (req, res) => {
  const membership = await membershipService.pauseMembership({
    membershipId: req.params.id,
    payload: req.body,
    context: req.context,
  })
  res.status(200).json(membership)
}

export const resumeMembership = async (req, res) => {
  const membership = await membershipService.resumeMembership({
    membershipId: req.params.id,
  })
  res.status(200).json(membership)
}

export const cancelMembership = async (req, res) => {
  const membership = await membershipService.cancelMembership({
    membershipId: req.params.id,
    reason: req.body?.reason,
  })
  res.status(200).json(membership)
}
