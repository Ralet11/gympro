import 'express-async-errors'
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import pinoHttp from 'pino-http'

import env from './config/env.js'
import logger from './config/logger.js'
import router from './routes/index.js'
import { notFoundHandler, errorHandler } from './middlewares/errorHandlers.js'
import { tenantContext } from './middlewares/tenant.js'

const app = express()

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || env.corsOrigins.includes('*') || env.corsOrigins.includes(origin)) {
      callback(null, origin ?? true)
      return
    }
    callback(new Error('CORS_NOT_ALLOWED'))
  },
  credentials: true,
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(compression())
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(pinoHttp({ logger }))

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptimeSec: process.uptime(), version: '0.1.0' })
})

app.use(tenantContext)

app.use('/v1', router)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
