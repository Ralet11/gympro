import Joi from 'joi'

export const listClassesSchema = Joi.object({
  query: Joi.object({
    category: Joi.string(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createClassSchema = Joi.object({
  body: Joi.object({
    id: Joi.string(),
    name: Joi.string().min(2).required(),
    category: Joi.string().allow('', null),
    defaultCapacity: Joi.number().integer().positive().default(20),
    description: Joi.string().allow('', null),
    policyJson: Joi.object().default({}),
    active: Joi.boolean(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateClassSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2),
    category: Joi.string().allow('', null),
    defaultCapacity: Joi.number().integer().positive(),
    description: Joi.string().allow('', null),
    policyJson: Joi.object(),
    active: Joi.boolean(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const listSessionsSchema = Joi.object({
  query: Joi.object({
    classId: Joi.string(),
    status: Joi.string().valid('scheduled', 'canceled', 'done'),
    locationId: Joi.string().uuid(),
    date: Joi.string().isoDate(),
    from: Joi.string().isoDate(),
    to: Joi.string().isoDate(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createSessionSchema = Joi.object({
  body: Joi.object({
    classId: Joi.string().required(),
    locationId: Joi.string().uuid(),
    coachId: Joi.string().uuid(),
    startsAt: Joi.string().isoDate().required(),
    endsAt: Joi.string().isoDate().required(),
    capacity: Joi.number().integer().positive(),
    status: Joi.string().valid('scheduled', 'canceled', 'done').default('scheduled'),
    meta: Joi.object().default({}),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateSessionSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    coachId: Joi.string().uuid(),
    startsAt: Joi.string().isoDate(),
    endsAt: Joi.string().isoDate(),
    capacity: Joi.number().integer().positive(),
    status: Joi.string().valid('scheduled', 'canceled', 'done'),
    meta: Joi.object(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const createBookingSchema = Joi.object({
  body: Joi.object({
    sessionId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().required(),
    source: Joi.string().valid('mobile', 'web', 'staff').default('mobile'),
    policyAcknowledged: Joi.boolean().default(false),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const listBookingsSchema = Joi.object({
  query: Joi.object({
    sessionId: Joi.string().uuid(),
    userId: Joi.string().uuid(),
    status: Joi.string().valid('booked', 'waitlist', 'canceled', 'attended', 'no_show'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})
