import Joi from 'joi'

export const listCheckinsSchema = Joi.object({
  query: Joi.object({
    userId: Joi.string().uuid(),
    from: Joi.string().isoDate(),
    to: Joi.string().isoDate(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createCheckinSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    gateId: Joi.string().allow('', null),
    source: Joi.string().valid('mobile', 'turnstile', 'staff').default('mobile'),
    locationId: Joi.string().uuid().optional(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const generateQrSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    locationId: Joi.string().uuid().optional(),
    ttlSeconds: Joi.number().integer().min(5).max(300).default(30),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const validateAccessSchema = Joi.object({
  body: Joi.object({
    qrToken: Joi.string().required(),
    gateId: Joi.string().allow('', null),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})
