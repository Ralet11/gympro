import * as checkinService from '../services/checkin.service.js'

export const listCheckins = async (req, res) => {
  const data = await checkinService.listCheckins({ context: req.context, query: req.query })
  res.status(200).json(data)
}

export const registerCheckin = async (req, res) => {
  const result = await checkinService.registerCheckin({
    context: req.context,
    payload: req.body,
  })
  res.status(201).json(result)
}

export const generateAccessQr = async (req, res) => {
  const result = await checkinService.generateAccessQr({
    context: req.context,
    payload: req.body,
  })
  res.status(201).json(result)
}

export const validateAccess = async (req, res) => {
  const result = await checkinService.validateAccess({
    context: req.context,
    payload: req.body,
  })
  res.status(200).json(result)
}
