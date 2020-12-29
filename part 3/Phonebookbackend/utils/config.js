//环境变量的处理被提取到一个单独的*utils/config.js* 文件中

require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}