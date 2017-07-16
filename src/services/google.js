import google from 'googleapis'

import logger from './logger'
import Error from '../models/error'

const drive = google.drive('v3')
const sheets = google.sheets('v4')

export function authenticate () {
  return new Promise((resolve, reject) => {
    // Create Google auth client using JWT
    const authClient = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/drive']
    )

    // Authorize the client
    authClient.authorize((err, tokens) => {
      if (err) {
        logger.error(err)
        reject(new Error('An error occurred while authenticating to Google'))
      } else resolve(authClient)
    })
  })
}

export function addFile (authClient, file, fileName, fileMimeType, folderId) {
  return new Promise((resolve, reject) => {
    drive.files.create({
      resource: {
        name: fileName,
        parents: [ folderId ]
      },
      media: {
        mimeType: fileMimeType,
        body: file
      },
      fields: 'id',
      auth: authClient
    }, (err, file) => {
      if (err) {
        logger.error(err)
        reject(new Error('An error occurred while adding the file to Google Drive'))
      } else resolve(file.id)
    })
  })
}

export function shareFile (authClient, fileId) {
  return new Promise((resolve, reject) => {
    drive.permissions.create({
      fileId,
      resource: {
        value: 'default',
        type: 'anyone',
        role: 'reader'
      },
      auth: authClient
    }, (err) => {
      if (err) {
        logger.error(err)
        reject(new Error('An error occurred while sharing the file'))
      } else resolve(`https://drive.google.com/file/d/${fileId}/view?usp=sharing`)
    })
  })
}

export function addRowInSheet (authClient, sheetId, values) {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Feuille 1!A1:G1',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          values
        ]
      },
      auth: authClient
    }, (err) => {
      if (err) {
        logger.error(err)
        reject(new Error('A problem occurred when adding the new row'))
      } else resolve()
    })
  })
}
