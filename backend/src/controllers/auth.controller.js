import * as authService from '../services/auth.service.js'

export const register = async (req, res) => {
  const user = await authService.register(req.body)
  res.status(201).json(user)
}

export const login = async (req, res) => {
  const result = await authService.login(req.body)
  res.status(200).json(result)
}

export const refreshToken = async (req, res) => {
  const result = await authService.refreshTokens(req.body)
  res.status(200).json(result)
}

export const logout = async (req, res) => {
  res.status(204).send()
}

export const getMe = async (req, res) => {
  const profile = await authService.getProfile(req.user.id)
  res.status(200).json(profile)
}
