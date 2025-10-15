import Joi from 'joi'

export const createGymSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    legalName: Joi.string().allow('', null),
    taxId: Joi.string().allow('', null),
    settingsJson: Joi.object().default({}),
    active: Joi.boolean(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateGymSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2),
    legalName: Joi.string().allow('', null),
    taxId: Joi.string().allow('', null),
    settingsJson: Joi.object(),
    active: Joi.boolean(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const createLocationSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    timezone: Joi.string().default('America/Argentina/Buenos_Aires'),
    address: Joi.string().allow('', null),
    capacity: Joi.number().integer().positive().default(100),
    settingsJson: Joi.object().default({}),
    active: Joi.boolean(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateLocationSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2),
    timezone: Joi.string(),
    address: Joi.string().allow('', null),
    capacity: Joi.number().integer().positive(),
    settingsJson: Joi.object(),
    active: Joi.boolean(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const updateSettingsSchema = Joi.object({
  body: Joi.object().keys().unknown(true),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})
