import env from '../config/env.js'
import logger from '../config/logger.js'
import AppError from '../utils/appError.js'

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  })
}

export const errorHandler = (err, req, res, next) => {
  if (!err) {
    return next()
  }

  const isAppError = err instanceof AppError
  const statusCode = isAppError ? err.statusCode : 500
  const response = {
    error: {
      code: isAppError ? err.code : 'SERVER_ERROR',
      message: err.message || 'Unexpected error',
    },
  }

  if (isAppError && err.details) {
    response.error.details = err.details
  }

  if (!isAppError && env.isDev) {
    response.error.stack = err.stack
  }

  logger.error({ err, path: req.originalUrl }, 'Request failed')
  res.status(statusCode).json(response)
}
