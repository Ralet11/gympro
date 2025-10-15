import Joi from 'joi'

export const listExercisesSchema = Joi.object({
  query: Joi.object({
    muscle: Joi.string(),
    equipment: Joi.string(),
    q: Joi.string(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createExerciseSchema = Joi.object({
  body: Joi.object({
    id: Joi.string(),
    name: Joi.string().min(2).required(),
    muscle: Joi.string().allow('', null),
    equipment: Joi.string().allow('', null),
    techniqueUrl: Joi.string().uri().allow('', null),
    meta: Joi.object().default({}),
    active: Joi.boolean(),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const listRoutinesSchema = Joi.object({
  query: Joi.object({
    userId: Joi.string().uuid(),
    status: Joi.string().valid('active', 'archived'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createRoutineSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    name: Joi.string().min(2).required(),
    status: Joi.string().valid('active', 'archived').default('active'),
    nextReview: Joi.string().isoDate(),
    meta: Joi.object().default({}),
    blocks: Joi.array()
      .items(
        Joi.object({
          day: Joi.string().required(),
          notes: Joi.string().allow('', null),
          order: Joi.number().integer(),
          exercises: Joi.array().items(
            Joi.object({
              exerciseId: Joi.string().required(),
              sets: Joi.number().integer().positive().required(),
              reps: Joi.string().required(),
              rir: Joi.number().integer().allow(null),
              tempo: Joi.string().allow('', null),
              restSec: Joi.number().integer().allow(null),
              order: Joi.number().integer(),
              meta: Joi.object().default({}),
            }),
          ),
        }),
      )
      .default([]),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateRoutineSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2),
    status: Joi.string().valid('active', 'archived'),
    nextReview: Joi.string().isoDate(),
    meta: Joi.object(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const assignRoutineSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    userId: Joi.string().uuid().required(),
  }),
  query: Joi.object({}).default({}),
})

export const listWorkoutsSchema = Joi.object({
  query: Joi.object({
    userId: Joi.string().uuid(),
    from: Joi.string().isoDate(),
    to: Joi.string().isoDate(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
  }),
  params: Joi.object({}).default({}),
  body: Joi.object({}).default({}),
})

export const createWorkoutSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    date: Joi.string().isoDate(),
    notes: Joi.string().allow('', null),
    meta: Joi.object().default({}),
    entries: Joi.array()
      .items(
        Joi.object({
          exerciseId: Joi.string().required(),
          order: Joi.number().integer(),
          meta: Joi.object().default({}),
          sets: Joi.array()
            .items(
              Joi.object({
                reps: Joi.number().integer().positive().required(),
                weight: Joi.number().required(),
                rpe: Joi.number().allow(null),
                effortSec: Joi.number().integer().allow(null),
              }),
            )
            .default([]),
        }),
      )
      .default([]),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})

export const updateWorkoutSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  body: Joi.object({
    date: Joi.string().isoDate(),
    notes: Joi.string().allow('', null),
    totalVolume: Joi.number().integer().min(0),
    meta: Joi.object(),
  }).min(1),
  query: Joi.object({}).default({}),
})

export const logBodyMetricSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    date: Joi.string().isoDate(),
    weight: Joi.number(),
    bodyFatPct: Joi.number(),
    waist: Joi.number(),
    chest: Joi.number(),
    thigh: Joi.number(),
    bmi: Joi.number(),
    meta: Joi.object().default({}),
  }),
  params: Joi.object({}).default({}),
  query: Joi.object({}).default({}),
})
