# part4

for project:
如果登陆后显示没有权限重新登录即可。

```js
{
  "username": "chenruotest",
  "password": "chenruotestpwd"
}
```

## logger

The logger has two functions, info for printing normal log messages, and error for all error messages.

Extracting logging into its own module is a good idea in several ways. If we wanted to start writing logs to a file or send them to an external logging service like graylog or papertrail we would only have to make changes in one place.

## Test

[unit tests](https://en.wikipedia.org/wiki/Unit_testing)

This kind of testing where multiple components of the system are being tested as a group is called [integration testing](https://en.wikipedia.org/wiki/Integration_testing).

The convention in Node is to define the execution mode of the application with the _NODE_ENV_ environment variable. In our current application, we only load the environment variables defined in the _.env_ file if the application is _not_ in production mode.

It is common practice to define separate modes for development and testing.

```json
{
  // ...
  "scripts": {
    "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development node --watch index.js",
    "test": "NODE_ENV=test node --test",
    "lint": "eslint ."
  }
  // ...
}
```

There is a slight issue in the way that we have specified the mode of the application in our scripts: it will not work on Windows. We can correct this by installing the [cross-env](https://www.npmjs.com/package/cross-env) package

```js
{
  // can then achieve cross-platform compatibility by using the cross-env library in our npm scripts defined in package.json
  "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development node --watch index.js",
    "test": "cross-env  NODE_ENV=test node --test",
    "lint": "eslint ."
  },
  // ...
}
```

use the [supertest](https://github.com/visionmedia/supertest) package to help us write our tests for testing the API.

```
// 单独跑某一个文件且log

node --experimental-vm-modules node_modules/.bin/jest --silent=false --verbose --runInBand tests/blog_api.test.js
```

## user administration

### pwd hash

The password hash is the output of a [one-way hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function) applied to the user's password. It is never wise to store unencrypted plain text passwords in the database!Let's install the [bcrypt](https://github.com/kelektiv/node.bcrypt.js) package for generating the password hashes.Some Windows users have had problems with _bcrypt_. If you run into problems, remove the library with command and install [bcryptjs](https://www.npmjs.com/package/bcryptjs) instead.

```js
const saltRounds = 10;
// The password sent in the request is not stored in the database. We store the hash of the password that is generated with the bcrypt.hash function.
const passwordHash = await bcrypt.hash(password, saltRounds);
```

The fundamentals of [storing passwords](https://codahale.com/how-to-safely-store-a-password/) are outside the scope of this course material. We will not discuss what the magic number 10 assigned to the [saltRounds](https://github.com/kelektiv/node.bcrypt.js/#a-note-on-rounds) variable means, but you can read more about it in the linked material.

### jsonwebtoken

Let's first implement the functionality for logging in. Install the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library, which allows us to generate [JSON web tokens](https://jwt.io/).

If the application has multiple interfaces requiring identification, JWT's validation should be separated into its own middleware. An existing library like [express-jwt](https://www.npmjs.com/package/express-jwt) could also be used.

- **400 Bad Request**
  - 适合客户端传的参数不符合要求（比如缺少 `username` / `password`，或者长度不足 3 个字符）。
- **409 Conflict**
  - 更适合用于资源冲突的情况，比如 `username` 已经存在。
  - 但很多教程/项目里也会直接用 **400** 来处理（保持一致）。

There are several ways of sending the token from the browser to the server. We will use the [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) header.

Other ways?

The header also tells which [authentication scheme](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Authentication_schemes) is used. This can be necessary if the server offers multiple ways to authenticate. Identifying the scheme tells the server how the attached credentials should be interpreted.

The _Bearer_ scheme is suitable for our needs.

```
curl -X GET http://localhost:3001/api/blogs
```

```
curl -X GET http://localhost:3001/api/blogs \
  -H "Authorization: Bearer Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx.yyy.zzz"
```

```js
401 Unauthorized → token 缺失或无效
403 Forbidden → 用户认证了，但没有权限删
404 Not Found → blog 不存在
```

```js
// 用户只能删除自己的post，通过请求token 和 用户自己的token 做对比
const reqToken = request.token;
const blog = await BlogList.findById(request.params.id);
const userToken = jwt.sign(
  { username: blog.user.username, id: blog.user.id },
  process.env.SECRET,
  {
    expiresIn: 60 * 60,
  }
);
```

Therefore, deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator.

其实不需要在删除时再重新生成一个 `userToken` 来和 `reqToken` 比较。
JWT 是 **一次签发，多次验证** 的，后端只需要：

1. **解码客户端传过来的 `reqToken`**（就是用户登录时签发的 token）。
2. **对比 token 里的用户 ID 和 blog 的创建者 ID**。

```js
const decodedToken = jwt.verify(request.token, process.env.SECRET);

if (!decodedToken.id) {
  return response.status(401).json({ error: 'token missing or invalid' });
}

const blog = await BlogList.findById(request.params.id);

if (!blog) {
  return response.status(404).json({ error: 'blog not found' });
}

// 注意：blog.user是 ObjectId，要转成字符串
if (blog.user.toString() !== decodedToken.id.toString()) {
  return response
    .status(403)
    .json({ error: 'only the creator can delete this blog' });
}
```
