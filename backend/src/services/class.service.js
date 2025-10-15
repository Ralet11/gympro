import { Op } from 'sequelize'
import AppError from '../utils/appError.js'
import { getModels, getSequelize } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse, applyRange } from '../utils/pagination.js'

export const listClasses = async ({ context, query }) => {
  const { FitnessClass } = getModels()
  const pagination = buildPagination(query)
  const where = { gymId: context.gymId }
  if (query.category) {
    where.category = query.category
  }
  const result = await FitnessClass.findAndCountAll({
    where,
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['name', 'ASC']],
  })

  return paginatedResponse(
    { rows: result.rows.map((row) => row.toJSON()), count: result.count },
    pagination,
  )
}

export const createClass = async ({ context, payload }) => {
  const { FitnessClass } = getModels()
  const id = payload.id || `cls_${Date.now()}`
  const existing = await FitnessClass.findOne({ where: { id, gymId: context.gymId } })
  if (existing) {
    throw new AppError('Class id already exists', { statusCode: 409, code: 'CLASS_EXISTS' })
  }
  const fitnessClass = await FitnessClass.create({
    id,
    gymId: context.gymId,
    name: payload.name,
    category: payload.category,
    defaultCapacity: payload.defaultCapacity || 20,
    description: payload.description,
    policyJson: payload.policyJson || {},
    active: payload.active ?? true,
  })
  return fitnessClass.toJSON()
}

export const updateClass = async ({ context, classId, payload }) => {
  const { FitnessClass } = getModels()
  const fitnessClass = await FitnessClass.findOne({ where: { id: classId, gymId: context.gymId } })
  if (!fitnessClass) {
    throw new AppError('Class not found', { statusCode: 404, code: 'CLASS_NOT_FOUND' })
  }
  await fitnessClass.update({
    name: payload.name ?? fitnessClass.name,
    category: payload.category ?? fitnessClass.category,
    defaultCapacity: payload.defaultCapacity ?? fitnessClass.defaultCapacity,
    description: payload.description ?? fitnessClass.description,
    policyJson: payload.policyJson ?? fitnessClass.policyJson,
    active: payload.active ?? fitnessClass.active,
  })

  return fitnessClass.toJSON()
}

export const deleteClass = async ({ context, classId }) => {
  const { FitnessClass, ClassSession } = getModels()
  const fitnessClass = await FitnessClass.findOne({ where: { id: classId, gymId: context.gymId } })
  if (!fitnessClass) {
    throw new AppError('Class not found', { statusCode: 404, code: 'CLASS_NOT_FOUND' })
  }
  const upcomingSessions = await ClassSession.count({
    where: { classId, startsAt: { [Op.gte]: new Date() } },
  })
  if (upcomingSessions > 0) {
    throw new AppError('Class has upcoming sessions', { statusCode: 409, code: 'CLASS_IN_USE' })
  }
  await fitnessClass.destroy()
}

export const listSessions = async ({ context, query }) => {
  const { ClassSession, FitnessClass, User, Location } = getModels()
  const pagination = buildPagination(query)
  const where = { gymId: context.gymId }

  if (context.locationId) {
    where.locationId = context.locationId
  }

  if (query.classId) {
    where.classId = query.classId
  }

  if (query.status) {
    where.status = query.status
  }

  if (query.date) {
    const date = new Date(query.date)
    const nextDay = new Date(date)
    nextDay.setDate(nextDay.getDate() + 1)
    where.startsAt = { [Op.gte]: date, [Op.lt]: nextDay }
  } else {
    const range = applyRange(query)
    if (range.from || range.to) {
      where.startsAt = {}
      if (range.from) where.startsAt[Op.gte] = range.from
      if (range.to) where.startsAt[Op.lte] = range.to
    }
  }

  const result = await ClassSession.findAndCountAll({
    where,
    include: [
      { model: FitnessClass },
      { model: User, as: 'Coach', attributes: ['id', 'fullName'] },
      { model: Location },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['startsAt', 'ASC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((session) => ({
        ...session.toJSON(),
        fitnessClass: session.FitnessClass,
        coach: session.Coach,
        location: session.Location,
      })),
      count: result.count,
    },
    pagination,
  )
}

export const createSession = async ({ context, payload }) => {
  const { ClassSession, FitnessClass } = getModels()
  const fitnessClass = await FitnessClass.findOne({ where: { id: payload.classId, gymId: context.gymId } })
  if (!fitnessClass) {
    throw new AppError('Class not found', { statusCode: 404, code: 'CLASS_NOT_FOUND' })
  }

  const session = await ClassSession.create({
    gymId: context.gymId,
    locationId: payload.locationId || context.locationId,
    classId: fitnessClass.id,
    coachId: payload.coachId,
    startsAt: payload.startsAt,
    endsAt: payload.endsAt,
    capacity: payload.capacity || fitnessClass.defaultCapacity,
    status: payload.status || 'scheduled',
    meta: payload.meta || {},
  })

  return session.toJSON()
}

export const updateSession = async ({ context, sessionId, payload }) => {
  const { ClassSession } = getModels()

  const session = await ClassSession.findOne({ where: { id: sessionId, gymId: context.gymId } })
  if (!session) {
    throw new AppError('Session not found', { statusCode: 404, code: 'SESSION_NOT_FOUND' })
  }

  await session.update({
    coachId: payload.coachId ?? session.coachId,
    startsAt: payload.startsAt ?? session.startsAt,
    endsAt: payload.endsAt ?? session.endsAt,
    capacity: payload.capacity ?? session.capacity,
    status: payload.status ?? session.status,
    meta: payload.meta ?? session.meta,
  })

  return session.toJSON()
}

export const deleteSession = async ({ context, sessionId }) => {
  const { ClassSession, Booking } = getModels()
  const session = await ClassSession.findOne({ where: { id: sessionId, gymId: context.gymId } })
  if (!session) {
    throw new AppError('Session not found', { statusCode: 404, code: 'SESSION_NOT_FOUND' })
  }

  const bookings = await Booking.count({
    where: { sessionId, status: { [Op.in]: ['booked', 'waitlist', 'attended'] } },
  })

  if (bookings > 0) {
    throw new AppError('Session has bookings', { statusCode: 409, code: 'SESSION_IN_USE' })
  }

  await session.destroy()
}

const ensureSessionAvailable = async ({ session, transaction }) => {
  if (session.status !== 'scheduled') {
    throw new AppError('Session not open for booking', { statusCode: 422, code: 'SESSION_NOT_BOOKABLE' })
  }

  const now = new Date()
  if (new Date(session.endsAt) < now) {
    throw new AppError('Session already finished', { statusCode: 409, code: 'SESSION_FINISHED' })
  }

  await session.reload({ transaction })
}

const ensureSessionMemberEligible = async ({ userId }) => {
  const { Membership } = getModels()
  const membership = await Membership.findOne({
    where: { userId, status: 'active' },
  })
  if (!membership) {
    throw new AppError('User has no active membership', {
      statusCode: 422,
      code: 'MEMBERSHIP_REQUIRED',
    })
  }
  return membership
}

export const createBooking = async ({ context, payload }) => {
  const { Booking, ClassSession, User } = getModels()
  const sequelize = getSequelize()

  const session = await ClassSession.findOne({ where: { id: payload.sessionId, gymId: context.gymId } })
  if (!session) {
    throw new AppError('Session not found', { statusCode: 404, code: 'SESSION_NOT_FOUND' })
  }

  const user = await User.findOne({ where: { id: payload.userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  const membership = await ensureSessionMemberEligible({ userId: user.id })

  return sequelize.transaction(async (transaction) => {
    await ensureSessionAvailable({ session, transaction })

    const existing = await Booking.findOne({
      where: { sessionId: session.id, userId: user.id },
      transaction,
    })
    if (existing) {
      throw new AppError('User already booked', { statusCode: 409, code: 'BOOKING_EXISTS' })
    }

    if (session.booked < session.capacity) {
      const booking = await Booking.create(
        {
          sessionId: session.id,
          userId: user.id,
          status: 'booked',
          source: payload.source || 'mobile',
          policyAck: payload.policyAcknowledged ?? false,
          meta: { membershipId: membership.id },
        },
        { transaction },
      )

      await session.update({ booked: session.booked + 1 }, { transaction })

      return booking.toJSON()
    }

    const waitlistRank = session.waitlist + 1
    const booking = await Booking.create(
      {
        sessionId: session.id,
        userId: user.id,
        status: 'waitlist',
        source: payload.source || 'mobile',
        policyAck: payload.policyAcknowledged ?? false,
        meta: { waitlistRank, membershipId: membership.id },
      },
      { transaction },
    )

    await session.update({ waitlist: session.waitlist + 1 }, { transaction })

    const result = booking.toJSON()
    result.waitlistRank = waitlistRank
    return result
  })
}

export const listBookings = async ({ context, query }) => {
  const { Booking, ClassSession, User } = getModels()
  const pagination = buildPagination(query)

  const where = {}
  if (query.sessionId) where.sessionId = query.sessionId
  if (query.userId) where.userId = query.userId
  if (query.status) where.status = query.status

  const result = await Booking.findAndCountAll({
    where,
    include: [
      { model: User, attributes: ['id', 'fullName'] },
      { model: ClassSession },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((booking) => ({
        ...booking.toJSON(),
        user: booking.User,
        session: booking.ClassSession,
      })),
      count: result.count,
    },
    pagination,
  )
}

export const cancelBooking = async ({ bookingId }) => {
  const { Booking, ClassSession } = getModels()
  const sequelize = getSequelize()

  return sequelize.transaction(async (transaction) => {
    const booking = await Booking.findByPk(bookingId, { transaction })
    if (!booking) {
      throw new AppError('Booking not found', { statusCode: 404, code: 'BOOKING_NOT_FOUND' })
    }

    if (booking.status === 'canceled') {
      return booking.toJSON()
    }

    const session = await ClassSession.findByPk(booking.sessionId, { transaction })

    if (booking.status === 'booked') {
      await session.update({ booked: Math.max(0, session.booked - 1) }, { transaction })
    } else if (booking.status === 'waitlist') {
      await session.update({ waitlist: Math.max(0, session.waitlist - 1) }, { transaction })
    }

    await booking.update(
      {
        status: 'canceled',
        canceledAt: new Date(),
      },
      { transaction },
    )

    return booking.toJSON()
  })
}

export const checkinBooking = async ({ bookingId }) => {
  const { Booking } = getModels()
  const booking = await Booking.findByPk(bookingId)
  if (!booking) {
    throw new AppError('Booking not found', { statusCode: 404, code: 'BOOKING_NOT_FOUND' })
  }
  await booking.update({
    status: 'attended',
    checkedInAt: new Date(),
  })
  return booking.toJSON()
}

export const confirmWaitlist = async ({ bookingId }) => {
  const { Booking, ClassSession } = getModels()
  const sequelize = getSequelize()

  return sequelize.transaction(async (transaction) => {
    const booking = await Booking.findByPk(bookingId, { transaction })
    if (!booking) {
      throw new AppError('Booking not found', { statusCode: 404, code: 'BOOKING_NOT_FOUND' })
    }
    if (booking.status !== 'waitlist') {
      throw new AppError('Booking not on waitlist', { statusCode: 409, code: 'NOT_WAITLIST' })
    }
    const session = await ClassSession.findByPk(booking.sessionId, { transaction })
    if (session.booked >= session.capacity) {
      throw new AppError('Session full', { statusCode: 409, code: 'SESSION_FULL' })
    }

    await session.update(
      {
        booked: session.booked + 1,
        waitlist: Math.max(0, session.waitlist - 1),
      },
      { transaction },
    )

    await booking.update(
      {
        status: 'booked',
        meta: { ...booking.meta, waitlistRank: null },
      },
      { transaction },
    )

    return booking.toJSON()
  })
}
