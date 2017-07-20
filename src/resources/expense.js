import expenseValidator from './expense-validator'
import logger from '../services/logger'
import { authenticate, addRowInSheet } from '../services/google'
import Expense from '../models/expense'
import { exceptionToResponse } from '../helpers'

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
        req.body.proof
      )
      const googleSpreadsheetId = req.body.gg_spreadsheetId

      // Authentication on Google
      const googleAuthClient = await authenticate()

      // Add a new row on Google Spreadsheet
      await addRowInSheet(googleAuthClient, googleSpreadsheetId, expense.toArray())

      res.status(201)
    } catch (e) {
      logger.error(e)
      exceptionToResponse(e, res)
    }

    res.end()
  }
}
