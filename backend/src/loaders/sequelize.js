import { Sequelize } from 'sequelize'
import env from '../config/env.js'
import logger from '../config/logger.js'
import { initModels } from '../db/models/index.js'

let sequelizeInstance

export const connectDatabase = async () => {
  if (sequelizeInstance) {
    return sequelizeInstance
  }

  sequelizeInstance = new Sequelize(env.databaseUrl, {
    logging: env.isDev ? (msg) => logger.debug(msg) : false,
    define: {
      underscored: true,
      timestamps: true,
      paranoid: true,
    },
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
