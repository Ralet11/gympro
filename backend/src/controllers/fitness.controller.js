import * as fitnessService from '../services/fitness.service.js'

export const listExercises = async (req, res) => {
  const data = await fitnessService.listExercises({ context: req.context, query: req.query })
  res.status(200).json(data)
}

export const createExercise = async (req, res) => {
  const exercise = await fitnessService.createExercise({ context: req.context, payload: req.body })
  res.status(201).json(exercise)
}

export const listRoutines = async (req, res) => {
  const routines = await fitnessService.listRoutines({ context: req.context, query: req.query })
  res.status(200).json(routines)
}

export const createRoutine = async (req, res) => {
  const routine = await fitnessService.createRoutine({ context: req.context, payload: req.body })
  res.status(201).json(routine)
}

export const updateRoutine = async (req, res) => {
  const routine = await fitnessService.updateRoutine({
    context: req.context,
    routineId: req.params.id,
    payload: req.body,
  })
  res.status(200).json(routine)
}

export const assignRoutine = async (req, res) => {
  const routine = await fitnessService.assignRoutine({
    context: req.context,
    routineId: req.params.id,
    userId: req.body.userId,
  })
  res.status(200).json(routine)
}

export const deleteRoutine = async (req, res) => {
  await fitnessService.deleteRoutine({ context: req.context, routineId: req.params.id })
  res.status(204).send()
}

export const listWorkouts = async (req, res) => {
  const workouts = await fitnessService.listWorkouts({ context: req.context, query: req.query })
  res.status(200).json(workouts)
}

export const createWorkout = async (req, res) => {
  const workout = await fitnessService.createWorkout({ context: req.context, payload: req.body })
  res.status(201).json(workout)
}

export const updateWorkout = async (req, res) => {
  const workout = await fitnessService.updateWorkout({
    context: req.context,
    workoutId: req.params.id,
    payload: req.body,
  })
  res.status(200).json(workout)
}

export const logBodyMetric = async (req, res) => {
  const metric = await fitnessService.logBodyMetric({ context: req.context, payload: req.body })
  res.status(201).json(metric)
}
