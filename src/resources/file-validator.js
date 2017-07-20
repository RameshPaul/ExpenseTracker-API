import Error from '../models/error'

export default (req) => {
  return new Promise((resolve, reject) => {
    // TODO: improve validation (type checking, etc)
    if (req.file &&
        req.file.size &&
        req.file.mimetype &&
        req.gg_folderId
    ) {
      resolve()
    } else {
      reject(new Error('Missing parameters', 400))
    }
  })
}
