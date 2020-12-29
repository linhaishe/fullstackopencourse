//*app.js* 是一个创建实际应用的文件，对路由对象使用use方法

//该文件将不同的中间件放到use中，其中之一是附加到 */persons* 路由的*personsRouter*


//如果请求的 URL 以 */api/notes*开头，则会使用之前定义的路由。 由于这个原因，notesRouter 对象必须只定义路由的相对部分，即空路径*/*或仅仅定义参数*/:id*。

const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app