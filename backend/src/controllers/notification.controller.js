import * as notificationService from '../services/notification.service.js'

export const registerDevice = async (req, res) => {
  const device = await notificationService.registerDevice({
    userId: req.user.id,
    payload: req.body,
  })
  res.status(201).json(device)
}

export const sendTestNotification = async (req, res) => {
  const result = await notificationService.sendTestNotification({ userId: req.user.id })
  res.status(200).json(result)
}
