import { Op } from 'sequelize'
import AppError from '../utils/appError.js'
import { getModels } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse, applyRange } from '../utils/pagination.js'

export const listStaff = async ({ context, query }) => {
  const { User, Role } = getModels()
  const pagination = buildPagination(query)
  const where = { gymId: context.gymId }
  if (query.role) {
    where['$Roles.key$'] = query.role
  }

  const result = await User.findAndCountAll({
    where,
    include: [{ model: Role, through: { attributes: [] } }],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['fullName', 'ASC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((user) => ({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        roles: user.Roles ? user.Roles.map((role) => role.key) : [],
      })),
      count: result.count,
    },
    pagination,
  )
}

export const listShifts = async ({ context, query }) => {
  const { Shift, User, Location } = getModels()
  const pagination = buildPagination(query)
  const range = applyRange(query)
  const where = { gymId: context.gymId }
  if (context.locationId) where.locationId = context.locationId
  if (query.staffId) where.staffId = query.staffId
  if (range.from || range.to) {
    where.startsAt = {}
    if (range.from) where.startsAt[Op.gte] = range.from
    if (range.to) where.startsAt[Op.lte] = range.to
  }

  const result = await Shift.findAndCountAll({
    where,
    include: [
      { model: User, as: 'Staff', attributes: ['id', 'fullName'] },
      { model: Location },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['startsAt', 'ASC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((shift) => ({
        ...shift.toJSON(),
        staff: shift.Staff,
        location: shift.Location,
      })),
      count: result.count,
    },
    pagination,
  )
}

export const createShift = async ({ context, payload }) => {
  const { Shift, User } = getModels()
  const staff = await User.findOne({ where: { id: payload.staffId, gymId: context.gymId } })
  if (!staff) {
    throw new AppError('Staff member not found', { statusCode: 404, code: 'STAFF_NOT_FOUND' })
  }

  const shift = await Shift.create({
    gymId: context.gymId,
    locationId: payload.locationId || context.locationId,
    staffId: staff.id,
    startsAt: payload.startsAt,
    endsAt: payload.endsAt,
    roleHint: payload.roleHint,
    notes: payload.notes,
  })

  return shift.toJSON()
}

export const updateShift = async ({ context, shiftId, payload }) => {
  const { Shift } = getModels()
  const shift = await Shift.findOne({ where: { id: shiftId, gymId: context.gymId } })
  if (!shift) {
    throw new AppError('Shift not found', { statusCode: 404, code: 'SHIFT_NOT_FOUND' })
  }

  await shift.update({
    startsAt: payload.startsAt ?? shift.startsAt,
    endsAt: payload.endsAt ?? shift.endsAt,
    roleHint: payload.roleHint ?? shift.roleHint,
    notes: payload.notes ?? shift.notes,
  })

  return shift.toJSON()
}
