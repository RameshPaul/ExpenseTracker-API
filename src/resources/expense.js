import { Readable } from 'stream'

import expenseValidator from './expense-validator'
import logger from '../services/logger'
import { authenticate, addFile, addRowInSheet, shareFile } from '../services/google'
import Expense from '../models/expense'
import { exceptionToResponse } from '../helpers'

export default {
  add: async (req, res) => {
    try {
      const reqBody = await expenseValidator(req)
      const expense = new Expense(reqBody)

      // Create stream from base64 string
      const fileStream = new Readable()
      fileStream.push(expense.proof, 'base64')
      fileStream.push(null)

      // Authentication on Google
      const googleAuthClient = await authenticate()

      // Store (proof) file on Google Drive
      const fileIdOnGoogleDrive = await addFile(
        googleAuthClient,
        fileStream, // fs.createReadStream(filePath),
        fileName,
        'image/jpeg',
        reqBody.gg_folderId
      )

      // Share this file (public share)
      const fileUrl = await shareFile(googleAuthClient, fileIdOnGoogleDrive)

      // Add a new row on Google Spreadsheet
      await addRowInSheet(googleAuthClient, reqBody.gg_spreadsheetId, [...expense.toArray(), fileUrl])

      res.status(201)
    } catch (e) {
      logger.error(e)
      exceptionToResponse(e, res)
    }

    res.end()
  }
}
