import * as staffService from '../services/staff.service.js'
import * as authService from '../services/auth.service.js'

export const listStaff = async (req, res) => {
  const staff = await staffService.listStaff({ context: req.context, query: req.query })
  res.status(200).json(staff)
}

export const createStaff = async (req, res) => {
  const staff = await authService.register({
    ...req.body,
    role: req.body.role || 'coach',
    gymId: req.context.gymId,
  })
  res.status(201).json(staff)
}

export const listShifts = async (req, res) => {
  const shifts = await staffService.listShifts({ context: req.context, query: req.query })
  res.status(200).json(shifts)
}

export const createShift = async (req, res) => {
  const shift = await staffService.createShift({ context: req.context, payload: req.body })
  res.status(201).json(shift)
}

export const updateShift = async (req, res) => {
  const shift = await staffService.updateShift({
    context: req.context,
    shiftId: req.params.id,
    payload: req.body,
  })
  res.status(200).json(shift)
}
