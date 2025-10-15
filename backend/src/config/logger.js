import pino from 'pino'
import env from './env.js'

const logger = pino({
  level: process.env.LOG_LEVEL || (env.isDev ? 'debug' : 'info'),
  base: undefined,
  redact: ['req.headers.authorization', 'req.body.password', 'req.body.passwordConfirm'],
})

export default logger
