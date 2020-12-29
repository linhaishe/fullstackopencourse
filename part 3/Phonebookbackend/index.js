//index.js 文件只从 *app.js* 文件导入实际的应用，然后启动应用

//Node 的内置web server模块,Node 还不支持 ES6模块，es6 ver :import http from 'http'
// const http = require('http')
const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})