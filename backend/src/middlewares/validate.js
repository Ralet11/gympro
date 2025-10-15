export const validate = (schema) => (req, res, next) => {
  if (!schema) return next()

  const payload = {
    body: req.body,
    params: req.params,
    query: req.query,
  }

  const { error, value } = schema.validate(payload, { abortEarly: false, allowUnknown: true })

  if (error) {
    const details = error.details.map((item) => ({
      message: item.message,
      path: item.path,
    }))

    return res.status(422).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details,
      },
    })
  }

  req.body = value.body
  req.params = value.params
  req.query = value.query

  return next()
}
