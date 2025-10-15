import dotenv from 'dotenv'

dotenv.config()

const rawDatabaseUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : ''

let parsedDatabaseUrl = null
if (rawDatabaseUrl.length > 0) {
  try {
    parsedDatabaseUrl = new URL(rawDatabaseUrl)
  } catch (error) {
    parsedDatabaseUrl = null
  }
}

const toNumber = (value) => {
  if (value === undefined || value === null || value === '') {
    return undefined
  }

  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

const pickFrom = (envValue, urlValue, fallback, { allowEmpty = false } = {}) => {
  const hasEnvValue = envValue !== undefined && envValue !== null
  if (hasEnvValue) {
    if (envValue === '' && !allowEmpty) {
      // continue to the next option
    } else {
      return envValue
    }
  }

  const hasUrlValue = urlValue !== undefined && urlValue !== null
  if (hasUrlValue) {
    if (urlValue === '' && !allowEmpty) {
      // continue to the fallback value
    } else {
      return urlValue
    }
  }

  return fallback
}

const urlDialect = parsedDatabaseUrl?.protocol
  ? parsedDatabaseUrl.protocol.replace(/:$/, '')
  : undefined
const urlDatabaseName = parsedDatabaseUrl?.pathname
  ? parsedDatabaseUrl.pathname.replace(/^\//, '')
  : undefined

const database = {
  dialect: pickFrom(process.env.DB_DIALECT, urlDialect, 'postgres'),
  host: pickFrom(process.env.DB_HOST, parsedDatabaseUrl?.hostname, '127.0.0.1'),
  port:
    toNumber(process.env.DB_PORT) ??
    (parsedDatabaseUrl ? toNumber(parsedDatabaseUrl.port) : undefined) ??
    5432,
  name: pickFrom(process.env.DB_NAME, urlDatabaseName, 'gym_pro'),
  user: pickFrom(process.env.DB_USER, parsedDatabaseUrl?.username, 'postgres', { allowEmpty: true }),
  password: pickFrom(
    process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : undefined,
    parsedDatabaseUrl ? parsedDatabaseUrl.password : undefined,
    'postgres',
    { allowEmpty: true }
  ),
  timezone: process.env.DB_TIMEZONE || 'Etc/UTC',
  ssl: process.env.DB_SSL === 'true',
  pool: {
    max: Number(process.env.DB_POOL_MAX || 10),
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
}

const buildDatabaseUrl = () => {
  if (rawDatabaseUrl.length > 0) {
    return rawDatabaseUrl
  }

  const url = new URL(`${database.dialect}://localhost`)
  url.hostname = database.host
  url.port = String(database.port)
  url.pathname = `/${database.name}`

  if (database.user) {
    url.username = database.user
  }

  if (database.password !== undefined) {
    url.password = database.password
  }

  return url.toString()
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  databaseUrl: buildDatabaseUrl(),
  databaseUrlFromEnv: rawDatabaseUrl.length > 0,
  database,
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
