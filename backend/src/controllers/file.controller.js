import * as fileService from '../services/file.service.js'

export const createUpload = async (req, res) => {
  const result = await fileService.createUploadRequest({
    userId: req.user.id,
    payload: req.body,
  })
  res.status(200).json(result)
}

export const deleteFile = async (req, res) => {
  await fileService.deleteFile({ fileId: req.params.id, userId: req.user.id })
  res.status(204).send()
}
