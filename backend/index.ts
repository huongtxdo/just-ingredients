import app from './app'
import config from './utils/config'
import logger from './utils/logger.js'

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

