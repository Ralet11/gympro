import Joi from 'joi'

export const listBenefitsSchema = Joi.object({
  query: Joi.object({
    category: Joi.string(),
    partnerId: Joi.string().uuid(),
    q: Joi.string(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createBenefitSchema = Joi.object({
  body: Joi.object({
    partnerId: Joi.string().uuid().required(),
    title: Joi.string().required(),
    category: Joi.string().allow('', null),
    pointsCost: Joi.number().integer().min(0).default(0),
    stock: Joi.number().integer().min(0).default(0),
    terms: Joi.string().allow('', null),
    active: Joi.boolean(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateBenefitSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    title: Joi.string(),
    category: Joi.string().allow('', null),
    pointsCost: Joi.number().integer().min(0),
    stock: Joi.number().integer().min(0),
    terms: Joi.string().allow('', null),
    active: Joi.boolean(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const redeemBenefitSchema = Joi.object({
  body: Joi.object({
    benefitId: Joi.string().uuid().required(),
    source: Joi.string().allow('', null),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const createPartnerSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required(),
    contactEmail: Joi.string().email().allow('', null),
    commissionPct: Joi.number().precision(2),
    active: Joi.boolean(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})
