import 'babel-core/register'
import 'babel-polyfill'

import dotenv from 'dotenv'
import homedir from 'homedir'
import express from 'express'

import config from '../config/config.json'
import logger from './services/logger'
import middlewares from './middlewares'
import routes from './routes'

// configure the path of environment variables
dotenv.config({path: `${homedir()}/${config.envFile}`})

// create express app
const app = express()

// register middlewares
middlewares(app)

// register routes
routes(app)

// start the app
const listener = app.listen(process.env.PORT || config.port, () => {
  logger.info(`Started on port ${listener.address().port}`)
})

export default app
