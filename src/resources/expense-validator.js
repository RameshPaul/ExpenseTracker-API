import { TYPES as expenseTypes } from '../models/expense'
import currencies from '../models/currencies'
import Error from '../models/error'

export default (req) => {
  // Validates expense attributes
  req.checkBody('type', `Must be part of [${[...expenseTypes]}], not empty`).notEmpty().inArray(expenseTypes)
  req.checkBody('recipient', 'Must not be empty').notEmpty()
  req.checkBody('description', 'Must not be empty').notEmpty()
  req.checkBody('amount', 'Must be a decimal value, not empty').notEmpty().isDecimal()
  req.checkBody('currency', `Must be part of [${[...currencies]}], not empty`).notEmpty().inArray(currencies)
  req.checkBody('date', 'Must be a date, not empty').notEmpty().isDate()
  req.checkBody('proof', 'Must be an url, not empty').notEmpty()

  // Validates Google attributes
  req.checkBody('gg_spreadsheetId', 'Must not be empty').notEmpty()

  return new Promise((resolve, reject) => {
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        reject(new Error(result.useFirstErrorOnly().array(), 400))
      } else {
        resolve()
      }
    })
  })
}
