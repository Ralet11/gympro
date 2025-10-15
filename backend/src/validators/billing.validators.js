import Joi from 'joi'

export const syncCustomerSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const createPaymentIntentSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    amount: Joi.number().integer().min(0).required(),
    currency: Joi.string().length(3).default('ARS'),
    captureMethod: Joi.string().valid('automatic', 'manual').default('automatic'),
    invoiceId: Joi.string(),
    metadata: Joi.object().default({}),
    dueDate: Joi.string().isoDate(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const listInvoicesSchema = Joi.object({
  query: Joi.object({
    userId: Joi.string().uuid(),
    status: Joi.string().valid('open', 'paid', 'void'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})
