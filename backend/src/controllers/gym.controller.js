import * as gymService from '../services/gym.service.js'

export const listGyms = async (req, res) => {
  const gyms = await gymService.listGyms({ context: req.context })
  res.status(200).json({ items: gyms })
}

export const createGym = async (req, res) => {
  const gym = await gymService.createGym(req.body)
  res.status(201).json(gym)
}

export const getGym = async (req, res) => {
  const gym = await gymService.getGym({ gymId: req.params.id })
  res.status(200).json(gym)
}

export const updateGym = async (req, res) => {
  const gym = await gymService.updateGym({ gymId: req.params.id, payload: req.body })
  res.status(200).json(gym)
}

export const listLocations = async (req, res) => {
  const locations = await gymService.listLocations({ context: req.context })
  res.status(200).json({ items: locations })
}

export const createLocation = async (req, res) => {
  const location = await gymService.createLocation({ payload: req.body, context: req.context })
  res.status(201).json(location)
}

export const updateLocation = async (req, res) => {
  const location = await gymService.updateLocation({
    locationId: req.params.id,
    payload: req.body,
    context: req.context,
  })
  res.status(200).json(location)
}

export const getSettings = async (req, res) => {
  const settings = await gymService.getSettings({ context: req.context })
  res.status(200).json(settings)
}

export const updateSettings = async (req, res) => {
  const settings = await gymService.updateSettings({ payload: req.body, context: req.context })
  res.status(200).json(settings)
}
