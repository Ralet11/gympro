import AppError from '../utils/appError.js'
import { getModels } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse } from '../utils/pagination.js'

export const listTickets = async ({ userId, query }) => {
  const { SupportTicket } = getModels()
  const pagination = buildPagination(query)
  const where = {}
  if (userId) where.userId = userId
  if (query.status) where.status = query.status

  const result = await SupportTicket.findAndCountAll({
    where,
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((ticket) => ticket.toJSON()),
      count: result.count,
    },
    pagination,
  )
}

export const createTicket = async ({ userId, payload }) => {
  const { SupportTicket } = getModels()
  const ticket = await SupportTicket.create({
    userId,
    subject: payload.subject,
    status: payload.status || 'open',
    channel: payload.channel || 'app',
    payload: payload.payload || {},
  })
  return ticket.toJSON()
}

export const updateTicket = async ({ ticketId, payload }) => {
  const { SupportTicket } = getModels()
  const ticket = await SupportTicket.findByPk(ticketId)
  if (!ticket) {
    throw new AppError('Ticket not found', { statusCode: 404, code: 'TICKET_NOT_FOUND' })
  }
  await ticket.update({
    status: payload.status ?? ticket.status,
    payload: payload.payload ?? ticket.payload,
  })
  return ticket.toJSON()
}
