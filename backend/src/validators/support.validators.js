import Joi from 'joi'

export const listSupportTicketsSchema = Joi.object({
  query: Joi.object({
    userId: Joi.string().uuid(),
    status: Joi.string().valid('open', 'pending', 'resolved', 'closed'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createSupportTicketSchema = Joi.object({
  body: Joi.object({
    subject: Joi.string().required(),
    status: Joi.string().valid('open', 'pending', 'resolved', 'closed').default('open'),
    channel: Joi.string().valid('app', 'email', 'frontdesk').default('app'),
    payload: Joi.object().default({}),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateSupportTicketSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    status: Joi.string().valid('open', 'pending', 'resolved', 'closed'),
    payload: Joi.object(),
  }).min(1),
  query: Joi.object({}).default({}),
})
