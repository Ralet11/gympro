import { v4 as uuid } from 'uuid'
import AppError from '../utils/appError.js'
import { getModels } from '../loaders/sequelize.js'

export const createUploadRequest = async ({ userId, payload }) => {
  const { FileAsset } = getModels()
  const file = await FileAsset.create({
    userId,
    scope: payload.scope,
    filename: payload.filename,
    contentType: payload.contentType,
    url: null,
    storage: 's3',
    meta: {},
  })

  // Placeholder signed URL
  const uploadUrl = `https://example.com/uploads/${uuid()}`

  return {
    fileId: file.id,
    uploadUrl,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  }
}

export const deleteFile = async ({ fileId, userId }) => {
  const { FileAsset } = getModels()
  const file = await FileAsset.findOne({ where: { id: fileId, userId } })
  if (!file) {
    throw new AppError('File not found', { statusCode: 404, code: 'FILE_NOT_FOUND' })
  }
  await file.destroy()
}
