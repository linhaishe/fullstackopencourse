# part3 notes

build a backend server with node(build-in http) or express

## 1. Simple web server with node

Implementing our server code directly with Node's built-in http web server

http web server 是 node 自己内置好的方法，可以用于做客户端的建设和处理。

`npm init`

init backend template

`"start": "node index.js"`

The server works the same way regardless of the latter part of the URL. Also the address http://localhost:3001/foo/bar will display the same content.

在根目录下(http://localhost:3001/)会显示这个database，即使后面有多的路径(http://localhost:3001/foo/bar)存在也会显示内容（ ？

```javascript
// index.js
const http = require('http')

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
```

## 2. express

code source : https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-1

express is also a Middleware. Middleware are functions that can be used for handling request and response objects.

Many libraries have been developed to ease server-side development with Node, by offering a more pleasing interface to work with the built-in http module. These libraries aim to provide a better abstraction for general use cases we usually require to build a backend server. By far the most popular library intended for this purpose is express.

`npm install express`

`npm install nodemon`  install in devDependence

nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.

```
{
  // ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ..
}
```

```javascript
// index.js
const express = require('express')
const app = express()

let notes = [
  // ...
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

## 3. REST

Representational State Transfer, aka REST, was introduced in 2000 in Roy Fielding's [dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm). REST is an architectural style meant for building scalable web applications.

表现层状态转换（REST，英文：Representational State Transfer）是Roy Thomas Fielding博士于2000年在他的博士论文中提出来的一种万维网软件架构风格，目的是便于不同软件/程序在网络（例如互联网）中互相传递信息。

```javascript
// find
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// delete
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
})
```

Since no data is attached to the response, we use the status method for setting the status and the end method for responding to the request without sending any data.

HTTP `204 No Content` 成功状态响应码，表示该请求已经成功了，但是客户端客户不需要离开当前页面。默认情况下 `204` 响应是可缓存的。一个 ETag 标头包含在此类响应中。
使用惯例是，在 PUT 请求中进行资源更新，但是不需要改变当前展示给用户的页面，那么返回 `204 No Content`。如果创建了资源，则返回 `201 Created` 。如果应将页面更改为新更新的页面，则应改用 `200` 。

## mock API with Postman / VS Code REST client plugin / webstrom

- [VS Code REST client plugin](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [postmam desktop](https://www.postman.com/downloads/)

If you use IntelliJ WebStorm instead, you can use a similar procedure with its built-in HTTP Client. Create a new file with extension `.rest` and the editor will display your options to create and run your requests. You can learn more about it by following [this guide](https://www.jetbrains.com/help/webstorm/http-client-in-product-code-editor.html).

VS Code REST client plugin
You can also add multiple requests in the same file using ###separators:

```js
GET http://localhost:3001/api/notes/

###
POST http://localhost:3001/api/notes/ HTTP/1.1
content-type: application/json

{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
```

app.use(unknownEndpoint) 放在最后是因为它定义了一个处理未知请求的中间件，如果放在前面，那么所有的请求都会被它捕获，而不会执行其它路由的处理函数。只有当其它路由没有匹配到请求路径时，才会由该中间件来处理这个请求。因此，将未知请求的处理放在最后可以确保其它路由先被尝试匹配，只有在路由都不匹配时，才由该中间件来处理这个请求。

## Middleware

The express json-parser we took into use earlier is a so-called middleware.

Middleware are functions that can be used for handling request and response objects.

```js
// middleware that prints information about every request that is sent to the server.
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  // At the end of the function body, the next function that was passed as a parameter is called. The next function yields control to the next middleware.
  next()
}

// This middleware will be used for catching requests made to non-existent routes. For these requests, the middleware will return an error message in the JSON format.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```

`app.use(requestLogger)`

## same origin policy and CORS

![image.png](http://tva1.sinaimg.cn/large/005NUwygly1hbzni2cxrij31me0fwtn6.jpg)

The issue lies with a thing called same origin policy. A URL's origin is defined by the combination of protocol (AKA scheme), hostname, and port.
The same-origin policy is a security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities.

In order to enable legitimate cross-origin requests (requests to URLs that don't share the same origin) W3C came up with a mechanism called CORS(Cross-Origin Resource Sharing). According to Wikipedia:

> Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.

We can allow requests from other origins by using Node's cors middleware.
```js
// npm install cors

const cors = require('cors')

app.use(cors())
```

## refs

1. The experiment above was done in the interactive [node-repl](https://nodejs.org/docs/latest-v8.x/api/documentation.html). You can start the interactive node-repl by typing in node in the command line.