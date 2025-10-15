const path = require('path')
const dotenv = require('dotenv')

const envPath = path.resolve(__dirname, '../../.env')
dotenv.config({ path: envPath })

const common = {
  url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/gym_pro',
  dialect: 'postgres',
  logging: false,
  define: {
    underscored: true,
    timestamps: true,
    paranoid: true,
  },
}

module.exports = {
  development: common,
  test: common,
  production: common,
}
