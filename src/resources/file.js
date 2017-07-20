import uuid from 'uuid'
import progress from 'progress-stream'

import logger from '../services/logger'
import { authenticate, addFile, shareFile } from '../services/google'
import fileValidator from './file-validator'

export default {
  upload: (emitters) => {
    return async (stream, req) => {
      try {
        await fileValidator(req)

        const progressHandler = progress({
          length: req.file.size,
          time: 100
        }).on('progress', progress => emitters.uploadFileProgress(progress.percentage))

        // Authentication on Google
        const googleAuthClient = await authenticate()

        // Store file on Google Drive
        const fileIdOnGoogleDrive = await addFile(
          googleAuthClient,
          stream.pipe(progressHandler),
          uuid.v4(),
          req.file.mimetype,
          req.gg_folderId
        )

        // Share this file (public share)
        const fileUrl = await shareFile(googleAuthClient, fileIdOnGoogleDrive)

        emitters.uploadFileSuccess(fileUrl)
      } catch (e) {
        logger.error(e)
        emitters.uploadFileError(e.message)
      }
    }
  }
}
