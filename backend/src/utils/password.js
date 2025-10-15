import bcrypt from 'bcryptjs'
import env from '../config/env.js'

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(env.bcryptSaltRounds)
  return bcrypt.hash(password, salt)
}

export const comparePassword = async (password, hash) => {
  if (!hash) return false
  return bcrypt.compare(password, hash)
}
