import { Sequelize } from 'sequelize'
import env from '../config/env.js'
import logger from '../config/logger.js'
import { initModels } from '../db/models/index.js'

let sequelizeInstance

export const connectDatabase = async () => {
  if (sequelizeInstance) {
    return sequelizeInstance
  }

  logger.info(
    {
      db: {
        dialect: env.database.dialect,
        host: env.database.host,
        port: env.database.port,
        name: env.database.name,
        user: env.database.user,
        ssl: env.database.ssl,
        usingUrl: env.databaseUrlFromEnv,
      },
    },
    'Initializing database connection'
  )

  const dialectOptions = {
    timezone: env.database.timezone,
    ...(env.database.ssl
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {}),
  }

  sequelizeInstance = new Sequelize(env.databaseUrl, {
    dialect: env.database.dialect,
    logging: env.isDev ? (msg) => logger.debug(msg) : false,
    define: {
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
    pool: env.database.pool,
    dialectOptions: Object.keys(dialectOptions).length ? dialectOptions : undefined,
  })

  initModels(sequelizeInstance)

  return sequelizeInstance
}

export const getModels = () => {
  if (!sequelizeInstance) {
    throw new Error('Database not initialized')
  }
  return sequelizeInstance.models
}

export const getSequelize = () => {
  if (!sequelizeInstance) {
    throw new Error('Database not initialized')
  }
  return sequelizeInstance
}
