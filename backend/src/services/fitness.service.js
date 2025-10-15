import { Op } from 'sequelize'
import AppError from '../utils/appError.js'
import { getModels, getSequelize } from '../loaders/sequelize.js'
import { buildPagination, paginatedResponse, applyRange } from '../utils/pagination.js'

export const listExercises = async ({ context, query }) => {
  const { Exercise } = getModels()
  const pagination = buildPagination(query)
  const where = { gymId: context.gymId }

  if (query.muscle) where.muscle = query.muscle
  if (query.equipment) where.equipment = query.equipment
  if (query.q) {
    where.name = { [Op.iLike]: `%${query.q}%` }
  }

  const result = await Exercise.findAndCountAll({
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

export const createExercise = async ({ context, payload }) => {
  const { Exercise } = getModels()
  const id = payload.id || `ex_${Date.now()}`
  const exercise = await Exercise.create({
    id,
    gymId: context.gymId,
    name: payload.name,
    muscle: payload.muscle,
    equipment: payload.equipment,
    techniqueUrl: payload.techniqueUrl,
    meta: payload.meta || {},
    active: payload.active ?? true,
  })
  return exercise.toJSON()
}

export const listRoutines = async ({ context, query }) => {
  const { Routine, RoutineBlock, RoutineExercise, Exercise, User } = getModels()
  const pagination = buildPagination(query)
  const where = { gymId: context.gymId }
  if (query.userId) where.userId = query.userId
  if (query.status) where.status = query.status

  const result = await Routine.findAndCountAll({
    where,
    include: [
      {
        model: RoutineBlock,
        include: [
          {
            model: RoutineExercise,
            include: [{ model: Exercise }],
          },
        ],
      },
      { model: User, attributes: ['id', 'fullName'] },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['createdAt', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((routine) => routine.toJSON()),
      count: result.count,
    },
    pagination,
  )
}

export const createRoutine = async ({ context, payload }) => {
  const { Routine, RoutineBlock, RoutineExercise, Exercise, User } = getModels()
  const sequelize = getSequelize()

  const user = await User.findOne({ where: { id: payload.userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  return sequelize.transaction(async (transaction) => {
    const routine = await Routine.create(
      {
        gymId: context.gymId,
        userId: user.id,
        name: payload.name,
        status: payload.status || 'active',
        nextReview: payload.nextReview,
        meta: payload.meta || {},
      },
      { transaction },
    )

    if (payload.blocks && Array.isArray(payload.blocks)) {
      for (const [index, block] of payload.blocks.entries()) {
        const routineBlock = await RoutineBlock.create(
          {
            routineId: routine.id,
            day: block.day,
            notes: block.notes,
            order: block.order ?? index,
          },
          { transaction },
        )

        if (block.exercises) {
          for (const [exerciseIndex, routineExercise] of block.exercises.entries()) {
            const exercise = await Exercise.findOne({
              where: { id: routineExercise.exerciseId, gymId: context.gymId },
              transaction,
            })
            if (!exercise) {
              throw new AppError(`Exercise ${routineExercise.exerciseId} not found`, {
                statusCode: 404,
                code: 'EXERCISE_NOT_FOUND',
              })
            }
            await RoutineExercise.create(
              {
                blockId: routineBlock.id,
                exerciseId: exercise.id,
                sets: routineExercise.sets,
                reps: routineExercise.reps,
                rir: routineExercise.rir,
                tempo: routineExercise.tempo,
                restSec: routineExercise.restSec,
                order: routineExercise.order ?? exerciseIndex,
                meta: routineExercise.meta || {},
              },
              { transaction },
            )
          }
        }
      }
    }

    return routine.toJSON()
  })
}

export const updateRoutine = async ({ context, routineId, payload }) => {
  const { Routine } = getModels()
  const routine = await Routine.findOne({ where: { id: routineId, gymId: context.gymId } })
  if (!routine) {
    throw new AppError('Routine not found', { statusCode: 404, code: 'ROUTINE_NOT_FOUND' })
  }

  await routine.update({
    name: payload.name ?? routine.name,
    status: payload.status ?? routine.status,
    nextReview: payload.nextReview ?? routine.nextReview,
    meta: payload.meta ?? routine.meta,
  })

  return routine.toJSON()
}

export const assignRoutine = async ({ context, routineId, userId }) => {
  const { Routine, User } = getModels()
  const routine = await Routine.findOne({ where: { id: routineId, gymId: context.gymId } })
  if (!routine) {
    throw new AppError('Routine not found', { statusCode: 404, code: 'ROUTINE_NOT_FOUND' })
  }

  const user = await User.findOne({ where: { id: userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  await routine.update({ userId: user.id })
  return routine.toJSON()
}

export const deleteRoutine = async ({ context, routineId }) => {
  const { Routine } = getModels()
  const routine = await Routine.findOne({ where: { id: routineId, gymId: context.gymId } })
  if (!routine) {
    throw new AppError('Routine not found', { statusCode: 404, code: 'ROUTINE_NOT_FOUND' })
  }
  await routine.destroy()
}

export const listWorkouts = async ({ context, query }) => {
  const { Workout, WorkoutEntry, WorkoutSet, Exercise } = getModels()
  const pagination = buildPagination(query)
  const range = applyRange(query)
  const where = { gymId: context.gymId }
  if (query.userId) where.userId = query.userId
  if (range.from || range.to) {
    where.date = {}
    if (range.from) where.date[Op.gte] = range.from
    if (range.to) where.date[Op.lte] = range.to
  }

  const result = await Workout.findAndCountAll({
    where,
    include: [
      {
        model: WorkoutEntry,
        include: [{ model: WorkoutSet }, { model: Exercise }],
      },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
    order: [['date', 'DESC']],
  })

  return paginatedResponse(
    {
      rows: result.rows.map((workout) => workout.toJSON()),
      count: result.count,
    },
    pagination,
  )
}

const calculateVolume = (entries = []) => {
  return entries.reduce((total, entry) => {
    return (
      total +
      entry.sets.reduce((sum, set) => {
        const reps = Number(set.reps || 0)
        const weight = Number(set.weight || 0)
        return sum + reps * weight
      }, 0)
    )
  }, 0)
}

export const createWorkout = async ({ context, payload }) => {
  const { Workout, WorkoutEntry, WorkoutSet, Exercise, User } = getModels()
  const sequelize = getSequelize()

  const user = await User.findOne({ where: { id: payload.userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  return sequelize.transaction(async (transaction) => {
    const workout = await Workout.create(
      {
        gymId: context.gymId,
        userId: user.id,
        date: payload.date || new Date().toISOString().substring(0, 10),
        notes: payload.notes,
        meta: payload.meta || {},
        totalVolume: 0,
      },
      { transaction },
    )

    let totalVolume = 0

    if (payload.entries) {
      for (const [entryIndex, entry] of payload.entries.entries()) {
        const exercise = await Exercise.findOne({
          where: { id: entry.exerciseId, gymId: context.gymId },
          transaction,
        })
        if (!exercise) {
          throw new AppError(`Exercise ${entry.exerciseId} not found`, {
            statusCode: 404,
            code: 'EXERCISE_NOT_FOUND',
          })
        }
        const workoutEntry = await WorkoutEntry.create(
          {
            workoutId: workout.id,
            exerciseId: exercise.id,
            order: entry.order ?? entryIndex,
            meta: entry.meta || {},
          },
          { transaction },
        )

        if (entry.sets) {
          for (const set of entry.sets) {
            await WorkoutSet.create(
              {
                entryId: workoutEntry.id,
                reps: set.reps,
                weight: set.weight,
                rpe: set.rpe,
                effortSec: set.effortSec,
              },
              { transaction },
            )
          }
        }
      }
      totalVolume = calculateVolume(payload.entries)
    }

    await workout.update({ totalVolume }, { transaction })
    return workout.toJSON()
  })
}

export const updateWorkout = async ({ context, workoutId, payload }) => {
  const { Workout } = getModels()
  const workout = await Workout.findOne({ where: { id: workoutId, gymId: context.gymId } })
  if (!workout) {
    throw new AppError('Workout not found', { statusCode: 404, code: 'WORKOUT_NOT_FOUND' })
  }

  await workout.update({
    date: payload.date ?? workout.date,
    notes: payload.notes ?? workout.notes,
    totalVolume: payload.totalVolume ?? workout.totalVolume,
    meta: payload.meta ?? workout.meta,
  })

  return workout.toJSON()
}

export const logBodyMetric = async ({ context, payload }) => {
  const { BodyMetric, User } = getModels()
  const user = await User.findOne({ where: { id: payload.userId, gymId: context.gymId } })
  if (!user) {
    throw new AppError('User not found', { statusCode: 404, code: 'USER_NOT_FOUND' })
  }

  const metric = await BodyMetric.create({
    gymId: context.gymId,
    userId: user.id,
    date: payload.date || new Date().toISOString().substring(0, 10),
    weight: payload.weight,
    bodyFatPct: payload.bodyFatPct,
    waist: payload.waist,
    chest: payload.chest,
    thigh: payload.thigh,
    bmi: payload.bmi,
    meta: payload.meta || {},
  })

  return metric.toJSON()
}
