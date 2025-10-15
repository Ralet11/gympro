import Joi from 'joi'

export const registerDeviceSchema = Joi.object({
  body: Joi.object({
    deviceId: Joi.string().required(),
    pushToken: Joi.string().required(),
    platform: Joi.string().valid('ios', 'android', 'web').required(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})
