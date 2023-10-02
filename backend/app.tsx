const config = require('./utils/config.js')
// const config = require('./utils/config').default
import express from 'express'
require('express-async-errors')
const app = express()
import cors from 'cors'

// import blogsRouter from './controllers/blogs.js'
// import usersRouter from './controllers/users.js'
// import loginRouter from './controllers/login.js'

import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDb')
  })
  .catch((error) => logger.error('error connecting to MongoDB', error.message))

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

// app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor) => we can register a middleware for a specific set of routes as below
// app.use('/api/blogs', middleware.userExtractor, blogsRouter)
// app.use('/api/users', usersRouter)
// app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// app.use(middleware.errorHandler)

module.exports = app

