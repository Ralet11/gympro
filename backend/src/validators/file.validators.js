import Joi from 'joi'

export const createUploadSchema = Joi.object({
  body: Joi.object({
    filename: Joi.string().required(),
    contentType: Joi.string().required(),
    scope: Joi.string().required(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})
