import { Op } from 'sequelize'
import { getModels, getSequelize } from '../loaders/sequelize.js'
import AppError from '../utils/appError.js'
import { buildPagination, paginatedResponse } from '../utils/pagination.js'

const sanitize = (user) => {
  const json = user.toJSON()
  return {
    id: json.id,
    gymId: json.gymId,
    email: json.email,
    fullName: json.fullName,
    phone: json.phone,
    status: json.status,
    preferences: json.preferences,
    roles: json.Roles ? json.Roles.map((role) => role.key) : [],
    createdAt: json.createdAt,
    updatedAt: json.updatedAt,
  }
}

export const listUsers = async ({ query, context }) => {
  const { User, Role } = getModels()
  const { gymId } = context
  const pagination = buildPagination(query)
  const where = { gymId }

  if (query.role) {
    where['$Roles.key$'] = query.role
  }

  if (query.active) {
    where.status = query.active === 'true' ? 'active' : { [Op.ne]: 'active' }
  }

  if (query.search) {
    where[Op.or] = [
      { email: { [Op.iLike]: `%${query.search}%` } },
      { fullName: { [Op.iLike]: `%${query.search}%` } },
    ]
  }

  const order = pagination.sort.startsWith('-')
    ? [[pagination.sort.substring(1), 'DESC']]
    : [[pagination.sort, 'ASC']]

  const result = await User.findAndCountAll({
    where,
    include: [{ model: Role, through: { attributes: [] } }],
    limit: pagination.limit,
    offset: pagination.offset,
    order,
  })

  return paginatedResponse(
    {
      rows: result.rows.map(sanitize),
      count: result.count,
    },
    pagination,
  )
}

export const getUser = async ({ userId, context }) => {
  const { User, Role } = getModels()
  const user = await User.findOne({
    where: { id: userId, gymId: context.gymId },
    include: [{ model: Role, through: { attributes: [] } }],
  })

  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  return sanitize(user)
}

export const updateUser = async ({ userId, payload, context }) => {
  const { User } = getModels()
  const user = await User.findOne({ where: { id: userId, gymId: context.gymId } })

  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  await user.update({
    fullName: payload.fullName ?? user.fullName,
    phone: payload.phone ?? user.phone,
    status: payload.status ?? user.status,
    preferences: payload.preferences ?? user.preferences,
    goalsJson: payload.goalsJson ?? user.goalsJson,
  })

  return sanitize(user)
}

export const updateRoles = async ({ userId, add = [], remove = [], context }) => {
  const { User, Role, UserRole } = getModels()
  const sequelize = getSequelize()

  const user = await User.findOne({ where: { id: userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  await sequelize.transaction(async (transaction) => {
    if (remove.length > 0) {
      await UserRole.destroy({
        where: {
          userId: user.id,
          roleId: {
            [Op.in]: await Role.findAll({
              where: { key: remove },
              attributes: ['id'],
              transaction,
            }).then((roles) => roles.map((r) => r.id)),
          },
        },
        transaction,
      })
    }

    if (add.length > 0) {
      const rolesToAdd = await Role.findAll({ where: { key: add }, transaction })
      for (const role of rolesToAdd) {
        await UserRole.findOrCreate({
          where: { userId: user.id, roleId: role.id },
          transaction,
        })
      }
    }
  })

  return getUser({ userId: user.id, context })
}

export const setUserStatus = async ({ userId, status, context }) => {
  const { User } = getModels()

  const user = await User.findOne({ where: { id: userId, gymId: context.gymId } })

  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  await user.update({ status })

  return sanitize(user)
}
