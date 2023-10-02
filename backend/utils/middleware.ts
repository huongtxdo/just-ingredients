import logger from './logger'
import jwt  from 'jsonwebtoken'

const requestLogger = (request: { method: any; path: any; body: any }, response: any, next: () => void) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

const errorHandler = (error: { message: any; name: string }, request: any, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { error: string }): any; new(): any }; json: { (arg0: { error: any }): any; new(): any } } }, next: () => void) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }
  next()
}

const tokenExtractor = (request: { get: (arg0: string) => any; token: any }, _response: any, next: () => void) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

// const userExtractor = async (request, response, next) => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     request.token = authorization.replace('Bearer ', '')
//     const decodedToken = jwt.verify(request.token, process.env.SECRET)
//     if (!decodedToken.id) {
//       return response.status(401).json({ error: 'token invalid' })
//     }
//     request.user = await User.findById(decodedToken.id)
//   }
//   next()
// }

export default { requestLogger, errorHandler, tokenExtractor, userExtractor }

