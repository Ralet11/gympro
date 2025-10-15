// src/loaders/sequelize.js  (CommonJS)
const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

console.log('[DB CFG]', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  hasPassword: Boolean(process.env.DB_PASSWORD),
  useUrl: Boolean(process.env.DATABASE_URL),
})

const useUrl = !!process.env.DATABASE_URL

const common = {
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: false,
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  },
  pool: {
    max: Number(process.env.DB_POOL_MAX || 10),
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
  dialectOptions: {
    timezone: process.env.DB_TIMEZONE || 'Etc/UTC',
    ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : undefined,
  },
}

const sequelize = useUrl
  ? new Sequelize(process.env.DATABASE_URL, common)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT || 5432),
        ...common,
      }
    )

module.exports = {
  sequelize,
  getSequelize: () => sequelize,
  getModels: () => sequelize.models,
}
