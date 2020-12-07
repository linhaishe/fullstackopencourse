//Node 的内置web server模块,Node 还不支持 ES6模块，es6 ver :import http from 'http'
const http = require('http')

let persons = 
    [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]


const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
})

//将绑定的HTTP 服务器分配给 app 变量 ，并监听发送到端口3001的 HTTP 请求
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)