//将所有到控制台的打印分离到它自己的模块
//logger- 模块的功能用于控制台的打印输出，告诉应用的运行状态。
//日志记录器有两个功能，info 用于打印正常的日志消息，error 用于所有错误消息
const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}