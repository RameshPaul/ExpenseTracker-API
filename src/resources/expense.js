import { Readable } from 'stream'
import uuid from 'uuid'

import expenseValidator from './expense-validator'
import logger from '../services/logger'
import { authenticate, addFile, addRowInSheet, shareFile } from '../services/google'
import Expense from '../models/expense'
import { exceptionToResponse } from '../helpers'

const buildFileName = (date) => `${date.replace(/\//g, '-')}_${uuid.v4()}.jpg`

export default {
  add: async (req, res) => {
    try {
      await expenseValidator(req)

      const expense = new Expense(
        req.body.type,
        req.body.recipient,
        req.body.description,
        req.body.amount,
        req.body.currency,
        req.body.date,
        req.files.proof
      )
      const googleFolderId = req.body.gg_folderId
      const googleSpreadsheetId = req.body.gg_spreadsheetId
      const fileName = buildFileName(expense.date)

      // Create stream from file Buffer
      const fileStream = new Readable()
      fileStream.push(expense.proof.data)
      fileStream.push(null)

      // Authentication on Google
      const googleAuthClient = await authenticate()

      // Store (proof) file on Google Drive
      const fileIdOnGoogleDrive = await addFile(
        googleAuthClient,
        fileStream,
        fileName,
        expense.proof.mimetype,
        googleFolderId
      )

      // Share this file (public share)
      const fileUrl = await shareFile(googleAuthClient, fileIdOnGoogleDrive)

      // Add a new row on Google Spreadsheet
      await addRowInSheet(googleAuthClient, googleSpreadsheetId, [...expense.toArray(), fileUrl])

      res.status(201)
    } catch (e) {
      logger.error(e)
      exceptionToResponse(e, res)
    }

    res.end()
  }
}
