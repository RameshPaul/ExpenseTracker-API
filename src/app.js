import 'babel-core/register'
import 'babel-polyfill'

import dotenv from 'dotenv'
import homedir from 'homedir'
import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

import config from '../config/config.json'
import logger from './services/logger'
import middlewares from './middlewares'
import routes from './routes'
import socket from './socket'

// configure the path of environment variables
dotenv.config({path: `${homedir()}/${config.envFile}`})

// create express app
const app = express()
// register middlewares
middlewares(app)
// register routes
routes(app)

// create HTTP server
const server = http.createServer(app)

// initialize socket io
const io = socketIo(server)
// register socket events
socket(io)

// listen on a specific port
server.listen(process.env.PORT || config.port, (test) => {
  logger.info(`Started on port ${server.address().port}`)
})
