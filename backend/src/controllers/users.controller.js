import * as authService from '../services/auth.service.js'
import * as userService from '../services/user.service.js'

export const listUsers = async (req, res) => {
  const data = await userService.listUsers({ query: req.query, context: req.context })
  res.status(200).json(data)
}

export const createUser = async (req, res) => {
  const payload = {
    ...req.body,
    gymId: req.context.gymId,
  }
  const user = await authService.register(payload)
  res.status(201).json(user)
}

export const getUser = async (req, res) => {
  const user = await userService.getUser({ userId: req.params.id, context: req.context })
  res.status(200).json(user)
}

export const updateUser = async (req, res) => {
  const user = await userService.updateUser({
    userId: req.params.id,
    payload: req.body,
    context: req.context,
  })
  res.status(200).json(user)
}

export const updateRoles = async (req, res) => {
  const user = await userService.updateRoles({
    userId: req.params.id,
    add: req.body.add,
    remove: req.body.remove,
    context: req.context,
  })
  res.status(200).json(user)
}

export const blockUser = async (req, res) => {
  const user = await userService.setUserStatus({
    userId: req.params.id,
    status: 'blocked',
    context: req.context,
  })
  res.status(200).json(user)
}

export const unblockUser = async (req, res) => {
  const user = await userService.setUserStatus({
    userId: req.params.id,
    status: 'active',
    context: req.context,
  })
  res.status(200).json(user)
}
