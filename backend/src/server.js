import env from './config/env.js'
import logger from './config/logger.js'
import app from './app.js'
import { connectDatabase } from './loaders/sequelize.js'

const start = async () => {
  try {
    const sequelize = await connectDatabase()
    await sequelize.authenticate()
    logger.info('Database connection established')

    if (env.isDev) {
      await sequelize.sync()
      logger.info('Database synced (development mode)')
    }

    const port = env.port
    app.locals.sequelize = sequelize

    app.listen(port, () => {
      logger.info(`Server listening on port ${port} (${env.nodeEnv})`)
    })
  } catch (error) {
    logger.error({ err: error }, 'Failed to start server')
    process.exit(1)
  }
}

start()
