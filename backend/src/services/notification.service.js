import { getModels } from '../loaders/sequelize.js'

export const registerDevice = async ({ userId, payload }) => {
  const { PushDevice } = getModels()
  const [device] = await PushDevice.findOrCreate({
    where: { userId, deviceId: payload.deviceId },
    defaults: {
      pushToken: payload.pushToken,
      platform: payload.platform,
      lastSeenAt: new Date(),
    },
  })

  await device.update({
    pushToken: payload.pushToken,
    platform: payload.platform,
    lastSeenAt: new Date(),
  })

  return device.toJSON()
}

export const sendTestNotification = async ({ userId }) => {
  // Placeholder: integrate with push provider
  return { ok: true, userId }
}
