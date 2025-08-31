# part3 notes

build a backend server with node(build-in http) or express
这块内容是纯后端的处理，前端的内容是从 part2 打包过来使用的。

online: https://phonebookbackend-pz4x.onrender.com/

render: https://dashboard.render.com/web/srv-cgaonk1mbg55nqjgiv3g

github: https://github.com/linhaishe/phonebookBackend/

## 1. Simple web server with node

Implementing our server code directly with Node's built-in http web server

http web server 是 node 自己内置好的方法，可以用于做客户端的建设和处理。

`npm init`

init backend template

`"start": "node index.js"`

The server works the same way regardless of the latter part of the URL. Also the address http://localhost:3001/foo/bar will display the same content.

在根目录下(http://localhost:3001/)会显示这个 database，即使后面有多的路径(http://localhost:3001/foo/bar)存在也会显示内容（ ？

```javascript
// index.js
const http = require('http');

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

## 2. express

code source : https://github.com/fullstack-hy2020/part3-notes-backend/tree/part3-1

express is also a Middleware. Middleware are functions that can be used for handling request and response objects.

Many libraries have been developed to ease server-side development with Node, by offering a more pleasing interface to work with the built-in http module. These libraries aim to provide a better abstraction for general use cases we usually require to build a backend server. By far the most popular library intended for this purpose is express.

`npm install express`

`npm install nodemon` install in devDependence

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
const express = require('express');
const app = express();

let notes = [
  // ...
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 3. REST

Representational State Transfer, aka REST, was introduced in 2000 in Roy Fielding's [dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm). REST is an architectural style meant for building scalable web applications.

表现层状态转换（REST，英文：Representational State Transfer）是 Roy Thomas Fielding 博士于 2000 年在他的博士论文中提出来的一种万维网软件架构风格，目的是便于不同软件/程序在网络（例如互联网）中互相传递信息。

```javascript
// find
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// delete
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});
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
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  // At the end of the function body, the next function that was passed as a parameter is called. The next function yields control to the next middleware.
  next();
};

// This middleware will be used for catching requests made to non-existent routes. For these requests, the middleware will return an error message in the JSON format.
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);
```

`app.use(requestLogger)`

### morgan

https://github.com/expressjs/morgan

morgan middleware to your application for logging.

However, most documentation in the world falls under the same category, so it's good to learn to decipher and interpret cryptic documentation in any case.

### express

### cors

cors 用于处理同源政策，提供跨域访问。

```js
const cors = require('cors');
app.use(cors());
```

> SyntaxError: Cannot use import statement outside a module

```json
// package.json
{
  "type": "module"
}
```

## same origin policy and CORS

![image.png](http://tva1.sinaimg.cn/large/005NUwygly1hbzni2cxrij31me0fwtn6.jpg)

The issue lies with a thing called same origin policy. A URL's origin is defined by the combination of protocol (AKA scheme), hostname, and port.
The same-origin policy is a security mechanism implemented by browsers in order to prevent session hijacking among other security vulnerabilities.

In order to enable legitimate cross-origin requests (requests to URLs that don't share the same origin) W3C came up with a mechanism called CORS(Cross-Origin Resource Sharing). According to Wikipedia:

> Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources (e.g. fonts) on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos. Certain "cross-domain" requests, notably Ajax requests, are forbidden by default by the same-origin security policy.

We can allow requests from other origins by using Node's cors middleware.

```js
// npm install cors

const cors = require('cors');
app.use(cors());
```

## application to the Internet,deploy application

use flyio, render, heroku, etc.这些项目有 free 的项目，可以部署简单的服务。

### 部署的时候需要注意的内容：

#### 1. 处理好环境接口响应

应用程序代码通过环境变量 PORT 获取正确的端口

The app code gets the right port through the environment variable PORT

```js
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### 2. 前端资源压缩打包

When the application is deployed, we must create a [production build](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build) or a version of the application which is optimized for production.

前端资源需要 build，文件中会有会有 static 文件，这个文件会存放静态文件，并不会被压缩。

This creates a directory called _build_ (which contains the only HTML file of our application, _index.html_ ) which contains the directory _static_. [Minified](<https://en.wikipedia.org/wiki/Minification_(programming)>) version of our application's JavaScript code will be generated in the _static_ directory. Even though the application code is in multiple files, all of the JavaScript will be minified into one file. All of the code from all of the application's dependencies will also be minified into this single file.

To make express show _static content_, the page _index.html_ and the JavaScript, etc., it fetches, we need a built-in middleware from express called [static](http://expressjs.com/en/starter/static-files.html).

`app.use(express.static('build'));`

前端工程跑 `npm run build` command

#### 3. 相关接口进行改写

里面对于接口的相关需要重新改写

Because of our situation, both the frontend and the backend are at the same address, we can declare _baseUrl_ as a [relative](https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2) URL. This means we can leave out the part declaring the server.

db.json 作 fake api 是不可以出现`/`作为 key 的，可以创建 route.json 去处理路有中带有`/`的情况。

Solution: https://stackoverflow.com/questions/57005091/path-with-in-json-server-db-json

```js
const baseUrl = 'http://localhost:3001/persons';
const baseUrl = '/api/persons';
```

上面的这种方式可以使得生产环境上的 url 进行连接，但是在本地开发的时候，会导致接口无响应，因为请求到了错误的地址。

Because in development mode the frontend is at the address localhost:3000, the requests to the backend go to the wrong address localhost:3000/api/notes. The backend is at localhost:3001.

如果是通过`create-react-app`创建的应用，可以通过 proxy，作地址代理。

After a restart, the React development environment will work as a proxy. If the React code does an HTTP request to a server address at http://localhost:3000 not managed by the React application itself (i.e. when requests are not about fetching the CSS or JavaScript of the application), the request will be redirected to the server at http://localhost:3001.

Now the frontend is also fine, working with the server both in development- and production mode.

```json
{
  "dependencies": {
    // ...
  },
  "scripts": {
    // ...
  },
  "proxy": "http://localhost:3001"
}
```

这一部分的部署开发需要前端不断的压缩打包并保存到后端的服务器中，是一件不好的事情。

This makes creating an automated deployment pipeline more difficult. Deployment pipeline means an automated and controlled way to move the code from the computer of the developer through different tests and quality checks to the production environment.

## connect to mongodb

use the Mongoose library that offers a higher-level API.

Mongoose could be described as an object document mapper (ODM), and saving JavaScript objects as Mongo documents is straightforward with this library.

使用一下内容，在 mongo.js 中运行，可以测试与 mongodb 的连接性测试

如果有问题，请查阅 mongoose 官网。

```js
// mock test
// node mongo.js yourPassword will add data to mongodb
import mongoose from 'mongoose';

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://user1:${password}@phonebookdb-cluster.ugddh.mongodb.net/phonebookdb-cluster?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  date: String,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'test date now3',
  important: true,
  date: new Date(),
});

note.save().then((result) => {
  console.log('note saved!');
  mongoose.connection.close();
});

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
```

## refs

1. The experiment above was done in the interactive [node-repl](https://nodejs.org/docs/latest-v8.x/api/documentation.html). You can start the interactive node-repl by typing in node in the command line.
1. There are multiple ways to achieve this (for example placing both backend and frontend code [in the same repository](https://github.com/mars/heroku-cra-node) ) but we will not go into those now.
1. In some situations, it may be sensible to deploy the frontend code as its own application. With apps created with create-react-app it is [straightforward](https://github.com/mars/create-react-app-buildpack).
