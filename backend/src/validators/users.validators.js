import Joi from 'joi'

export const listUsersSchema = Joi.object({
  query: Joi.object({
    role: Joi.string().valid('member', 'coach', 'admin', 'frontdesk'),
    active: Joi.string().valid('true', 'false'),
    search: Joi.string().max(120),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sort: Joi.string(),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createUserSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    fullName: Joi.string().min(2).required(),
    role: Joi.string().valid('member', 'coach', 'admin', 'frontdesk').default('member'),
    phone: Joi.string().allow('', null),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateUserSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    fullName: Joi.string().min(2),
    phone: Joi.string().allow('', null),
    status: Joi.string().valid('active', 'blocked', 'pending'),
    preferences: Joi.object(),
    goalsJson: Joi.object(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const updateRolesSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    add: Joi.array().items(Joi.string().valid('member', 'coach', 'admin', 'frontdesk')).default([]),
    remove: Joi.array().items(Joi.string().valid('member', 'coach', 'admin', 'frontdesk')).default([]),
  }),
  query: Joi.object({}).default({}),
})
