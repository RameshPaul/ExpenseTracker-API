import validator from 'express-validator'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import cors from 'cors'
import { stream } from './services/logger'

export default (app) => {
  app.use(morgan('dev', { stream }))
  app.use(cors())
  app.use(fileUpload())
  app.use(validator({
    customValidators: {
      inArray: (value, array) => {
        return array.indexOf(value) >= 0
      },
      isFile: (value, file) => {
        return !!file.name && !!file.mimetype && !!file.data
      }
    }
  }))
}
