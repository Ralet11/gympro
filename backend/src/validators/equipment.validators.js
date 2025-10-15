import Joi from 'joi'

export const listEquipmentSchema = Joi.object({
  query: Joi.object({
    type: Joi.string(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createEquipmentSchema = Joi.object({
  body: Joi.object({
    locationId: Joi.string().uuid(),
    type: Joi.string().required(),
    brand: Joi.string().allow('', null),
    model: Joi.string().allow('', null),
    serialNumber: Joi.string().allow('', null),
    installedAt: Joi.string().isoDate(),
    status: Joi.string().valid('ok', 'maintenance', 'out_of_service').default('ok'),
    meta: Joi.object().default({}),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateEquipmentSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    type: Joi.string(),
    brand: Joi.string().allow('', null),
    model: Joi.string().allow('', null),
    serialNumber: Joi.string().allow('', null),
    installedAt: Joi.string().isoDate(),
    status: Joi.string().valid('ok', 'maintenance', 'out_of_service'),
    meta: Joi.object(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const listTicketsSchema = Joi.object({
  query: Joi.object({
    equipmentId: Joi.string().uuid(),
    status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed'),
    severity: Joi.string().valid('low', 'medium', 'high'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createTicketSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow('', null),
    severity: Joi.string().valid('low', 'medium', 'high').default('low'),
    status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed'),
    assignedTo: Joi.string().uuid().allow(null),
    meta: Joi.object().default({}),
  }),
  query: Joi.object({}).default({}),
})

export const updateTicketSchema = Joi.object({
  params: Joi.object({
    ticketId: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    title: Joi.string(),
    description: Joi.string().allow('', null),
    severity: Joi.string().valid('low', 'medium', 'high'),
    status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed'),
    assignedTo: Joi.string().uuid().allow(null),
    meta: Joi.object(),
  }).min(1),
  query: Joi.object({}).default({}),
})
