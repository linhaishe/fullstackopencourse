### json sever for mock backend functionality

json-server was installed as a development dependency (--save-dev), since the program itself doesn't require it. It is used for assistance during software development.

```
npm install axios
npm install json-server --save-dev
```

After installing run the following command to run the json-server. The json-server starts running on port 3000 by default;

but since projects created using create-react-app reserve port 3000, we must define an alternate port, such as port 3001, for the json-server.

The --watch option automatically looks for any saved changes to db.json

`json-server --port 3001 --watch db.json`

However, a global installation is not necessary. From the root directory of your app, we can run the json-server using the command npx:

`npx json-server --port 3001 --watch db.json`

```
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json"
  },
}
```

```
npm run serve
```

### axios catch 中为什么要加 return 作为结尾

在使用 Axios 进行 HTTP 请求时，我们可以使用.catch()方法来处理任何可能出现的错误。当.catch()方法中包含一个返回语句时，它将终止该函数并返回一个值，这是为了避免在.catch()方法完成后继续执行该函数的其余代码。

如果.catch()方法中没有返回语句，那么该函数将会在.catch()方法完成后继续执行下去，这可能会导致意想不到的结果或错误。因此，在.catch()方法中添加一个返回语句可以确保程序在捕获异常后立即停止运行，并返回适当的错误信息。
