import Joi from 'joi'

export const listMembershipsSchema = Joi.object({
  query: Joi.object({
    userId: Joi.string().uuid(),
    status: Joi.string().valid('active', 'paused', 'canceled', 'expired'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createMembershipSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    planId: Joi.string().required(),
    startDate: Joi.string().isoDate(),
    meta: Joi.object().default({}),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const pauseMembershipSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    from: Joi.string().isoDate(),
    to: Joi.string().isoDate(),
    reason: Joi.string().allow('', null),
  }),
  query: Joi.object({}).default({}),
})

export const resumeMembershipSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const cancelMembershipSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    reason: Joi.string().allow('', null),
  }).default({}),
  query: Joi.object({}).default({}),
})
