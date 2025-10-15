import Joi from 'joi'

export const listStaffSchema = Joi.object({
  query: Joi.object({
    role: Joi.string().valid('coach', 'frontdesk', 'admin'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createStaffSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    fullName: Joi.string().min(2).required(),
    role: Joi.string().valid('coach', 'frontdesk', 'admin').default('coach'),
    phone: Joi.string().allow('', null),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const listShiftsSchema = Joi.object({
  query: Joi.object({
    staffId: Joi.string().uuid(),
    from: Joi.string().isoDate(),
    to: Joi.string().isoDate(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createShiftSchema = Joi.object({
  body: Joi.object({
    staffId: Joi.string().uuid().required(),
    locationId: Joi.string().uuid(),
    startsAt: Joi.string().isoDate().required(),
    endsAt: Joi.string().isoDate().required(),
    roleHint: Joi.string().allow('', null),
    notes: Joi.string().allow('', null),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateShiftSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    startsAt: Joi.string().isoDate(),
    endsAt: Joi.string().isoDate(),
    roleHint: Joi.string().allow('', null),
    notes: Joi.string().allow('', null),
  }).min(1),
  query: Joi.object({}).default({}),
})
