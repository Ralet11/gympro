import AppError from '../utils/appError.js'
import { getModels } from '../loaders/sequelize.js'

export const listGyms = async ({ context }) => {
  const { Gym } = getModels()
  if (context.gymId) {
    const gym = await Gym.findByPk(context.gymId)
    return gym ? [gym] : []
  }
  return Gym.findAll()
}

export const createGym = async (payload) => {
  const { Gym } = getModels()
  return Gym.create({
    name: payload.name,
    legalName: payload.legalName,
    taxId: payload.taxId,
    settingsJson: payload.settingsJson || {},
    active: payload.active ?? true,
  })
}

export const getGym = async ({ gymId }) => {
  const { Gym } = getModels()
  const gym = await Gym.findByPk(gymId)
  if (!gym) {
    throw new AppError('Gym not found', { statusCode: 404, code: 'GYM_NOT_FOUND' })
  }
  return gym
}

export const updateGym = async ({ gymId, payload }) => {
  const gym = await getGym({ gymId })
  await gym.update({
    name: payload.name ?? gym.name,
    legalName: payload.legalName ?? gym.legalName,
    taxId: payload.taxId ?? gym.taxId,
    active: payload.active ?? gym.active,
    settingsJson: payload.settingsJson ?? gym.settingsJson,
  })
  return gym
}

export const listLocations = async ({ context }) => {
  const { Location } = getModels()
  return Location.findAll({ where: { gymId: context.gymId } })
}

export const createLocation = async ({ payload, context }) => {
  const { Location } = getModels()
  return Location.create({
    gymId: context.gymId,
    name: payload.name,
    timezone: payload.timezone,
    address: payload.address,
    capacity: payload.capacity,
    settingsJson: payload.settingsJson || {},
    active: payload.active ?? true,
  })
}

export const updateLocation = async ({ locationId, payload, context }) => {
  const { Location } = getModels()
  const location = await Location.findOne({ where: { id: locationId, gymId: context.gymId } })
  if (!location) {
    throw new AppError('Location not found', { statusCode: 404, code: 'LOCATION_NOT_FOUND' })
  }

  await location.update({
    name: payload.name ?? location.name,
    timezone: payload.timezone ?? location.timezone,
    address: payload.address ?? location.address,
    capacity: payload.capacity ?? location.capacity,
    settingsJson: payload.settingsJson ?? location.settingsJson,
    active: payload.active ?? location.active,
  })

  return location
}

export const getSettings = async ({ context }) => {
  const gym = await getGym({ gymId: context.gymId })
  return gym.settingsJson || {}
}

export const updateSettings = async ({ payload, context }) => {
  const gym = await getGym({ gymId: context.gymId })
  const settings = { ...(gym.settingsJson || {}), ...payload }
  await gym.update({ settingsJson: settings })
  return settings
}
