
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const bloglistsRouter = require('./controllers/bloglists')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

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

//使用中间件并允许来自所有来源的请求
app.use(cors())
//在 Express 中提供静态文件,访问图像和级联样式表 (CSS) 等静态资源
app.use(express.static('build'))
//请求主体 (express.json()) 中的 JSON 对象
app.use(express.json())
//app.use(handler),For a custom handler
app.use(middleware.requestLogger)
//open http://localhost:3001/api/blogs
app.use('/api/blogs', bloglistsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app