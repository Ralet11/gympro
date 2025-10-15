import * as equipmentService from '../services/equipment.service.js'

export const listEquipment = async (req, res) => {
  const equipment = await equipmentService.listEquipment({ context: req.context, query: req.query })
  res.status(200).json(equipment)
}

export const createEquipment = async (req, res) => {
  const equipment = await equipmentService.createEquipment({ context: req.context, payload: req.body })
  res.status(201).json(equipment)
}

export const updateEquipment = async (req, res) => {
  const equipment = await equipmentService.updateEquipment({
    context: req.context,
    equipmentId: req.params.id,
    payload: req.body,
  })
  res.status(200).json(equipment)
}

export const listTickets = async (req, res) => {
  const tickets = await equipmentService.listTickets({ context: req.context, query: req.query })
  res.status(200).json(tickets)
}

export const createTicket = async (req, res) => {
  const ticket = await equipmentService.createTicket({
    context: req.context,
    equipmentId: req.params.id,
    payload: req.body,
    reporterId: req.user.id,
  })
  res.status(201).json(ticket)
}

export const updateTicket = async (req, res) => {
  const ticket = await equipmentService.updateTicket({
    ticketId: req.params.ticketId,
    payload: req.body,
  })
  res.status(200).json(ticket)
}
