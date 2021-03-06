//Node 的内置web server模块,Node 还不支持 ES6模块，es6 ver :import http from 'http'
// const http = require('http')
require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//Receiving data

morgan.token('POST', (req, res) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :POST')
)

// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
// ];

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
  // const infoContent = `phonebook has info for '${persons.length}' people`;
  // const time = new Date();
  // res.send(infoContent + "<br>" + "<br>" + time);
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p><p>${new Date()}</p>`
    )
  })
})

//open http://localhost:3001/api/persons
// /api/persons获取数据失败为什么？ /persons获取数据成功
// 创建build之前，获取数据来源写的就是/persons ，副本未变，可查。即使改了source code 副本也不会改变。所以写api/person会取不到数据，因为没有改api,因为你自己没跟教程教的走！
app.get('/persons', (req, res) => {
  // res.json(persons);
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

//将绑定的HTTP 服务器分配给 app 变量 ，并监听发送到端口3001的 HTTP 请求
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// Fetching a single resource

app.get('/persons/:id', (request, response) => {
  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);
  // if (Person) {
  //   // response.json(person);
  //   Person.findById(request.params.id).then((person) => {
  //     response.json(person);
  //   });
  // } else {
  //   response.status(404).end();
  // }
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))

  // .catch((error) => {
  //   console.log(error);
  //   response.status(400).send({ error: "malformatted id" });
  // });
})

app.delete('/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id);
  // persons = persons.filter((person) => person.id !== id);
  // response.status(204).end();

  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

//找出当前列表中最大的 id 号，并将其赋值给 maxId 变量+1
// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0
//   return maxId + 1
// }

app.post('/persons', (request, response) => {
  //未能进行判断，如何拿到person数据进行判断？
  const body = request.body
  // console.log("bodybodybody", body);
  // console.log("body.name", typeof body.name);
  // const bodyName = body.name;
  // console.log("personspersons", persons);
  // const duplicateCheck = persons.find((person) => person.name === bodyName);
  // console.log("duplicateCheck.name", duplicateCheck);
  //如果名字或号码为空则报错
  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: "name or phone number is  missing",
  //   });
  // } else if (
  //   duplicateCheck.name === body.name &&
  //   typeof duplicateCheck !== "undefined"
  // ) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }
  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: generateId(),
  // };
  // persons = persons.concat(person);
  // response.json(person);
  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateId(),
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson.toJSON())
  })
})

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

//已存在是否更新
app.put('/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson.toJSON()))
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
