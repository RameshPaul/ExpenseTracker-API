import fs from 'fs'

import logger from './logger'
import Error from '../models/error'

export function storeBase64AsFile (path, fileName, base64) {
  return new Promise((resolve, reject) => {
    const fullPath = `${path}/${fileName}`
    fs.writeFile(fullPath, base64, 'base64', (err) => {
      if (err) {
        logger.error(err)
        reject(new Error('A problem occurred while storing the file'))
      } else resolve(fullPath)
    })
  })
}
