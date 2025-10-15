import Joi from 'joi'

export const createPlanSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().min(2).required(),
    description: Joi.string().allow('', null),
    price: Joi.number().integer().min(0).required(),
    currency: Joi.string().length(3).default('ARS'),
    billingPeriod: Joi.string().valid('weekly', 'monthly', 'quarterly', 'yearly').default('monthly'),
    includesJson: Joi.object().default({}),
    active: Joi.boolean(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updatePlanSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2),
    description: Joi.string().allow('', null),
    price: Joi.number().integer().min(0),
    currency: Joi.string().length(3),
    billingPeriod: Joi.string().valid('weekly', 'monthly', 'quarterly', 'yearly'),
    includesJson: Joi.object(),
    active: Joi.boolean(),
  }).min(1),
  query: Joi.object({}).default({}),
})
