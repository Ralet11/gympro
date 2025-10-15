import Joi from 'joi'

export const registerSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    fullName: Joi.string().min(2).required(),
    role: Joi.string().valid('member', 'coach', 'admin', 'frontdesk').default('member'),
    gymId: Joi.string().uuid().required(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const refreshSchema = Joi.object({
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})
