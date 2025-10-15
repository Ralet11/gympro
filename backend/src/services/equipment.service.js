import AppError from '../utils/appError.js'
import { getModels } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse } from '../utils/pagination.js'

export const listEquipment = async ({ context, query }) => {
  const { Equipment, Location } = getModels()
  const pagination = buildPagination(query)
  const where = { gymId: context.gymId }
  if (context.locationId) where.locationId = context.locationId
  if (query.type) where.type = query.type

  const result = await Equipment.findAndCountAll({
    where,
    include: [{ model: Location }],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((equipment) => ({
        ...equipment.toJSON(),
        location: equipment.Location,
      })),
      count: result.count,
    },
    pagination,
  )
}

export const createEquipment = async ({ context, payload }) => {
  const { Equipment } = getModels()
  const equipment = await Equipment.create({
    gymId: context.gymId,
    locationId: payload.locationId || context.locationId,
    type: payload.type,
    brand: payload.brand,
    model: payload.model,
    serialNumber: payload.serialNumber,
    installedAt: payload.installedAt,
    status: payload.status || 'ok',
    meta: payload.meta || {},
  })
  return equipment.toJSON()
}

export const updateEquipment = async ({ context, equipmentId, payload }) => {
  const { Equipment } = getModels()
  const equipment = await Equipment.findOne({ where: { id: equipmentId, gymId: context.gymId } })
  if (!equipment) {
    throw new AppError('Equipment not found', { statusCode: 404, code: 'EQUIPMENT_NOT_FOUND' })
  }

  await equipment.update({
    type: payload.type ?? equipment.type,
    brand: payload.brand ?? equipment.brand,
    model: payload.model ?? equipment.model,
    serialNumber: payload.serialNumber ?? equipment.serialNumber,
    installedAt: payload.installedAt ?? equipment.installedAt,
    status: payload.status ?? equipment.status,
    meta: payload.meta ?? equipment.meta,
  })

  return equipment.toJSON()
}

export const listTickets = async ({ context, query }) => {
  const { EquipmentTicket, Equipment, User } = getModels()
  const pagination = buildPagination(query)
  const where = {}
  if (query.status) where.status = query.status
  if (query.severity) where.severity = query.severity
  if (query.equipmentId) where.equipmentId = query.equipmentId

  const result = await EquipmentTicket.findAndCountAll({
    where,
    include: [
      { model: Equipment },
      { model: User, as: 'Reporter', attributes: ['id', 'fullName'] },
      { model: User, as: 'Assignee', attributes: ['id', 'fullName'] },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((ticket) => ({
        ...ticket.toJSON(),
        equipment: ticket.Equipment,
        reporter: ticket.Reporter,
        assignee: ticket.Assignee,
      })),
      count: result.count,
    },
    pagination,
  )
}

export const createTicket = async ({ context, equipmentId, payload, reporterId }) => {
  const { EquipmentTicket, Equipment } = getModels()
  const equipment = await Equipment.findOne({ where: { id: equipmentId, gymId: context.gymId } })
  if (!equipment) {
    throw new AppError('Equipment not found', { statusCode: 404, code: 'EQUIPMENT_NOT_FOUND' })
  }

  const ticket = await EquipmentTicket.create({
    equipmentId: equipment.id,
    title: payload.title,
    description: payload.description,
    severity: payload.severity || 'low',
    status: payload.status || 'open',
    reportedBy: reporterId,
    assignedTo: payload.assignedTo,
    meta: payload.meta || {},
  })

  return ticket.toJSON()
}

export const updateTicket = async ({ ticketId, payload }) => {
  const { EquipmentTicket } = getModels()
  const ticket = await EquipmentTicket.findByPk(ticketId)
  if (!ticket) {
    throw new AppError('Ticket not found', { statusCode: 404, code: 'TICKET_NOT_FOUND' })
  }

  await ticket.update({
    title: payload.title ?? ticket.title,
    description: payload.description ?? ticket.description,
    severity: payload.severity ?? ticket.severity,
    status: payload.status ?? ticket.status,
    assignedTo: payload.assignedTo ?? ticket.assignedTo,
    meta: payload.meta ?? ticket.meta,
  })

  return ticket.toJSON()
}
