import jwt from 'jsonwebtoken'
import env from '../config/env.js'

export const signAccessToken = (payload, options = {}) => {
  return jwt.sign(payload, env.jwtAccessSecret, { expiresIn: env.jwtAccessTtl, ...options })
}

export const signRefreshToken = (payload, options = {}) => {
  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshTtl, ...options })
}

export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwtAccessSecret)
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret)
}
