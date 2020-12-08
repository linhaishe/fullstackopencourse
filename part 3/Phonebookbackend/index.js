//Node 的内置web server模块,Node 还不支持 ES6模块，es6 ver :import http from 'http'
// const http = require('http')
const express = require('express')
const app = express()

//Receiving data
app.use(express.json())

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

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
  })

//找出当前列表中最大的 id 号，并将其赋值给 maxId 变量+1
  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {

    const body = request.body
    const duplicateCheck = persons.find((person) => person.name === body.name);
    console.log(body)
    // const person = persons.find(person => person.id === id)
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or phone number is  missing' 
      })
    }else if(duplicateCheck.name === body.name
){
  return response.status(400).json({ 
  error: 'name must be unique' 
})
} 

    const person = {
      name: body.name,
      number:body.number,
      id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)

  })


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})