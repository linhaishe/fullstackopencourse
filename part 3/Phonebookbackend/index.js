//Node 的内置web server模块,Node 还不支持 ES6模块，es6 ver :import http from 'http'
// const http = require('http')
const express = require('express')
const app = express()

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

//*Content-Type* 头中的 *application/json* 值通知接收方数据为 JSON 格式。 使用 *JSON.stringify(notes)* 方法将 *notes* 数组转换为 JSON


//const http = require('http')的响应方式
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(persons))
// })

// const infoContent=`phonebook has info for '${persons.length}' people`
// const time = new Date();

//open http://localhost:3001
app.get('/info', (req, res) => {
    const infoContent=`phonebook has info for '${persons.length}' people`
    const time = new Date();
    res.send(infoContent+'<br>'+'<br>'+time)
  })

//open http://localhost:3001/api/persons
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

//将绑定的HTTP 服务器分配给 app 变量 ，并监听发送到端口3001的 HTTP 请求
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// Fetching a single resource

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {    
        response.json(person)  
    } else {    
        response.status(404).end()  
    }
  }
  )


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})