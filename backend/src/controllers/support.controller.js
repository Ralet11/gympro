import * as supportService from '../services/support.service.js'

export const listTickets = async (req, res) => {
  const tickets = await supportService.listTickets({
    userId: req.query.userId || (req.user.roles.includes('member') ? req.user.id : undefined),
    query: req.query,
  })
  res.status(200).json(tickets)
}

export const createTicket = async (req, res) => {
  const ticket = await supportService.createTicket({ userId: req.user.id, payload: req.body })
  res.status(201).json(ticket)
}

export const updateTicket = async (req, res) => {
  const ticket = await supportService.updateTicket({ ticketId: req.params.id, payload: req.body })
  res.status(200).json(ticket)
}
