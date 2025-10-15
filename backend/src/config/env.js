import dotenv from 'dotenv'

dotenv.config()

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/gym_pro',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'change-me-access',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change-me-refresh',
  jwtAccessTtl: process.env.JWT_ACCESS_TTL || '1h',
  jwtRefreshTtl: process.env.JWT_REFRESH_TTL || '30d',
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
  corsOrigins: (process.env.CORS_ORIGINS || '*').split(',').map((origin) => origin.trim()),
}

env.isDev = env.nodeEnv === 'development'
env.isTest = env.nodeEnv === 'test'
env.isProd = env.nodeEnv === 'production'

export default env
