import * as classService from '../services/class.service.js'

export const listClasses = async (req, res) => {
  const data = await classService.listClasses({ context: req.context, query: req.query })
  res.status(200).json(data)
}

export const createClass = async (req, res) => {
  const result = await classService.createClass({ context: req.context, payload: req.body })
  res.status(201).json(result)
}

export const updateClass = async (req, res) => {
  const result = await classService.updateClass({
    context: req.context,
    classId: req.params.id,
    payload: req.body,
  })
  res.status(200).json(result)
}

export const deleteClass = async (req, res) => {
  await classService.deleteClass({ context: req.context, classId: req.params.id })
  res.status(204).send()
}

export const listSessions = async (req, res) => {
  const result = await classService.listSessions({ context: req.context, query: req.query })
  res.status(200).json(result)
}

export const createSession = async (req, res) => {
  const result = await classService.createSession({ context: req.context, payload: req.body })
  res.status(201).json(result)
}

export const updateSession = async (req, res) => {
  const result = await classService.updateSession({
    context: req.context,
    sessionId: req.params.id,
    payload: req.body,
  })
  res.status(200).json(result)
}

export const deleteSession = async (req, res) => {
  await classService.deleteSession({ context: req.context, sessionId: req.params.id })
  res.status(204).send()
}

export const listBookings = async (req, res) => {
  const result = await classService.listBookings({ context: req.context, query: req.query })
  res.status(200).json(result)
}

export const createBooking = async (req, res) => {
  const result = await classService.createBooking({
    context: req.context,
    payload: req.body,
  })
  res.status(201).json(result)
}

export const cancelBooking = async (req, res) => {
  const result = await classService.cancelBooking({ bookingId: req.params.id })
  res.status(200).json(result)
}

export const checkinBooking = async (req, res) => {
  const result = await classService.checkinBooking({ bookingId: req.params.id })
  res.status(200).json(result)
}

export const confirmWaitlist = async (req, res) => {
  const result = await classService.confirmWaitlist({ bookingId: req.params.id })
  res.status(200).json(result)
}
