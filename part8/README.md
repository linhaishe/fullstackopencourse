# about part 8

library-backend

node/nodemon index.js / node/nodemon demo.js

node - 22.19.0

```js
// usage in apollo server
query {
  bookCount
  authorCount
}

query {
  allBooks {
    title
    author
    published
    genres
  }
}

query {
  allAuthors {
    name
    bookCount
  }
}

query {
  allBooks(author: "Robert Martin") {
    title
  }
}

query {
  allBooks(genre: "refactoring") {
    title
    author
  }
}

query {
  allBooks(author: "Robert Martin", genre: "refactoring") {
    title
    author
  }
}

mutation ExampleQuery {
  addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title
    author
  }
}

mutation {
  editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
    name
    born
  }
}

```

# GraphQL

## GraphQL-server

REST, familiar to us from the previous parts of the course, has long been the most prevalent way to implement the interfaces servers offer for browsers, and in general the integration between different applications on the web.

[GraphQL](http://graphql.org/), developed by Facebook, has become popular for communication between web applications and servers.

The GraphQL philosophy is very different from REST. REST is _resource-based_. Every resource, for example a _user_, has its own address which identifies it, for example _/users/10_. All operations done to the resource are done with HTTP requests to its URL. The action depends on the HTTP method used.

The main principle of GraphQL is that the code on the browser forms a _query_ describing the data wanted, and sends it to the API with an HTTP POST request. Unlike REST, all GraphQL queries are sent to the same address, and their type is POST.

GraphQL query describes only the data moving between a server and the client. On the server, the data can be organized and saved any way we like.

Despite its name, GraphQL does not actually have anything to do with databases. It does not care how the data is saved. The data a GraphQL API uses can be saved into a relational database, document database, or to other servers which a GraphQL server can access with for example REST.

Let's implement a GraphQL server with today's leading library: [Apollo Server](https://www.apollographql.com/docs/apollo-server/).

The schema describes two [types](https://graphql.org/learn/schema/#type-system). The first type, _Person_, determines that persons have five fields. Four of the fields are type _String_, which is one of the [scalar types](https://graphql.org/learn/schema/#scalar-types) of GraphQL.

```js
// In the heart of all GraphQL applications is a schema, which describes the data sent between the client and the server.
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

let persons = [
  {
    name: 'Arto Hellas',
    phone: '040-123543',
    street: 'Tapiolankatu 5 A',
    city: 'Espoo',
    id: '3d594650-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Matti Luukkainen',
    phone: '040-432342',
    street: 'Malminkaari 10 A',
    city: 'Helsinki',
    id: '3d599470-3436-11e9-bc57-8b80ba54c431',
  },
  {
    name: 'Venla Ruuska',
    street: 'Nallemäentie 22 C',
    city: 'Helsinki',
    id: '3d599471-3436-11e9-bc57-8b80ba54c431',
  },
];

const typeDefs = `
  type Person {
    name: String!
    phone: String
    street: String!
    city: String! 
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) => persons.find((p) => p.name === args.name),
  },
};

const server = new ApolloServer({
  typeDefs, // typeDefs, contains the GraphQL schema.
  resolvers, // which contains the resolvers of the server. These are the code, which defines how GraphQL queries are responded to.
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

## Apollo Studio Explorer

When Apollo server is run in development mode the page [http://localhost:4000](http://localhost:4000/) has a button _Query your server_ that takes us to [GraphOS Studio Explorer](https://www.apollographql.com/docs/graphos/platform/explorer). This is very useful for a developer, and can be used to make queries to the server.

### others part 1

第一部分的 answer

https://github.com/fullstack-hy2020/misc/tree/master

# React and GraphQL

![](https://s2.loli.net/2025/09/24/9sSRhOlFdiQCL6m.png)

The communication works by sending HTTP POST requests to http://localhost:4000/graphql. The query itself is a string sent as the value of the key _query_.

We could take care of the communication between the React app and GraphQL by using Axios. However, most of the time, it is not very sensible to do so. It is a better idea to use a higher-order library capable of abstracting the unnecessary details of the communication.

At the moment, there are two good options: [Relay](https://facebook.github.io/relay/) by Facebook and [Apollo Client](https://www.apollographql.com/docs/react/), which is the client side of the same library we used in the previous section. Apollo is absolutely the most popular of the two, and we will use it in this section as well.

一般不会用 **Axios** 来直接跟 GraphQL API 通信，因为 Axios 只是个 HTTP 客户端，不会帮你处理 GraphQL 特有的东西（比如 query/mutation 的结构、缓存、订阅、错误处理、类型安全等等）。

在 React 里常见的做法是用 **专门的 GraphQL 客户端库**，最常见的是这两个：

1. **Apollo Client**
   - 功能最全，生态大。
   - 内置缓存、状态管理、分页处理、订阅（WebSocket）、乐观更新。
   - TS 支持好，可以配合 codegen 自动生成 hooks 和类型。
   - 缺点是比较重。
2. **Relay**（Facebook 出品）
   - 更强调性能和规范，严格依赖 GraphQL schema。
   - 自动规范数据获取，强依赖 Fragment + codegen。
   - 学习曲线更陡。

除此之外，还有一些轻量的选择：

- **urql** → 相比 Apollo 更轻量灵活，插件式架构，比较适合不想要太重框架的场景。
- **graphql-request** → 超轻量，只是对 fetch 做了封装，适合小项目。

---

👉 总结：

- 大多数 React 项目：**Apollo Client**
- 要极致性能/规范：**Relay**
- 想轻量灵活：**urql**
- 只要最简单调用：**graphql-request**

```jsx
import ReactDOM from 'react-dom/client';
import App from './App';

import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const query = gql`
  query {
    allPersons {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

client.query({ query }).then((response) => {
  console.log(response.data);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
```

```jsx
import { gql, useQuery } from '@apollo/client';

import Persons from './components/Persons';

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

const App = () => {
  const result = useQuery(ALL_PERSONS);
  const [nameToSearch, setNameToSearch] = useState(null);
  const result2 = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    // for lazyload / One possibility for this kind of situations is the hook function useLazyQuery
    skip: !nameToSearch,
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
    </div>
  );
};

export default App;
```

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@apollo/client": "^3.8.4",
    "graphql": "^16.8.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@vitejs/plugin-react": "^3.1.0",
    "vite": "^4.1.0"
  }
}
```

```js
import { gql } from '@apollo/client';

export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;
```

```jsx
import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_PERSON, ALL_PERSONS } from '../queries';

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join('\n');
      setError(messages);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName('');
    setPhone('');
    setStreet('');
    setCity('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{' '}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{' '}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{' '}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  );
};

export default PersonForm;
```

## Fragment

in GraphQL that multiple queries return similar results.

The fragments **_are not_** defined in the GraphQL schema, but in the client. The fragments must be declared when the client uses them for queries.

```js
query {
  findPerson(name: "Pekka Mikkola") {
    name
    phone
    address{
      street
      city
    }
  }
}

query {
  allPersons {
    name
    phone
    address{
      street
      city
    }
  }
}

fragment PersonDetails on Person {
  name
  phone
  address {
    street
    city
  }
}

// With the fragment, we can do the queries in a compact form:

query {
  allPersons {
    ...PersonDetails
  }
}

query {
  findPerson(name: "Pekka Mikkola") {
    ...PersonDetails
  }
}

const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone
    address {
      street
      city
    }
  }
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`
```

## Subscriptions

Along with query and mutation types, GraphQL offers a third operation type: [subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/). With subscriptions, clients can _subscribe_ to updates about changes in the server.

all interaction between browser and server was due to a React application in the browser making HTTP requests to the server. GraphQL queries and mutations have also been done this way. With subscriptions, the situation is the opposite. After an application has made a subscription, it starts to listen to the server. When changes occur on the server, it sends a notification to all of its _subscribers_.

Technically speaking, the HTTP protocol is not well-suited for communication from the server to the browser. So, under the hood, Apollo uses [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) for server subscriber communication.

```
subscription {
  bookAdded {
    title
  }
}
```

## n+1 question

GraphQL Foundation's [DataLoader](https://github.com/graphql/dataloader) library offers a good solution for the n+1 problem among other issues. More about using DataLoader with Apollo server [here](https://www.robinwieruch.de/graphql-apollo-server-tutorial/#graphql-server-data-loader-caching-batching) and [here](http://www.petecorey.com/blog/2017/08/14/batching-graphql-queries-with-dataloader/).

## Epilogue

The application we created in this part is not optimally structured: we did some cleanups but much would still need to be done. Examples for better structuring of GraphQL applications can be found on the internet. For example, for the server [here](https://www.apollographql.com/blog/modularizing-your-graphql-schema-code) and the client [here](https://medium.com/@peterpme/thoughts-on-structuring-your-apollo-queries-mutations-939ba4746cd8).

GraphQL is already a pretty old technology, having been used by Facebook since 2012, so we can see it as "battle-tested" already. Since Facebook published GraphQL in 2015, it has slowly gotten more and more attention, and might in the near future threaten the dominance of REST. The death of REST has also already been [predicted](https://www.radiofreerabbit.com/podcast/52-is-2018-the-year-graphql-kills-rest). Even though that will not happen quite yet, GraphQL is absolutely worth [learning](https://blog.graphqleditor.com/javascript-predictions-for-2019-by-npm/).

## QA

### 1. 

安装包里有 tsx，但是跑起来报错 zsh: command not found: tsx

```
tsx index.js
```

你能安装到依赖里，但是 zsh 报 command not found: tsx，说明 没装全局命令 或者 环境变量里找不到本地的 .bin。

 ✅ 1. 用 `npx` 执行（推荐）

`tsx` 是装在 `node_modules/.bin/tsx` 里的，本地运行时直接用 `npx` 就行：

```
npx tsx src/index.ts
```

watch 模式：

```
npx tsx watch src/index.ts
```

---

✅ 2. 在 `package.json` 里写 script

这样只用 `npm run` 或 `pnpm run` 调用，不用管 PATH：

```
"scripts": {
  "dev": "tsx watch src/index.ts",
  "start": "tsx src/index.ts"
}
```

然后运行：

```
npm run dev
```

### 2.

订阅成功了，但是有报错 App.jsx:20 订阅出错 ApolloError: ID cannot represent value: { type: "Buffer", data: [Array] }

ChatGPT 说：

明白了，你现在订阅成功，但是前端报错：

```
ApolloError: ID cannot represent value: { type: "Buffer", data: [Array] }
```

这个问题其实是 **GraphQL 类型和 MongoDB 数据类型不匹配**。具体分析如下：

------

 1️⃣ 问题原因

- 你的 `Book` model 里 `author` 和 `_id` 都是 MongoDB `ObjectId` 类型。
- 在 GraphQL schema 中，你可能定义了：

```
type Book {
  id: ID!
  title: String!
  author: Author!
  published: Int!
  genres: [String!]!
}
```

- GraphQL 的 `ID` 类型 **只能序列化成字符串**，不能直接返回 MongoDB 的 `ObjectId` 或 Buffer。
- 错误信息说明，你在 `bookAdded` payload 返回了一个对象，包含了 **MongoDB 的 Buffer** 或 ObjectId，没有经过 `toString()` 转换。

------

2️⃣ Mutation / Subscription 返回值处理

你在 `addBook` resolver 里：

```
await book.save();
pubsub.publish('BOOK_ADDED', { bookAdded: book });
return await book.populate('author', 'name');
```

问题：

- `book` 里 `_id` 是 ObjectId
- 你没有调用 `toJSON()` 或手动转换
- GraphQL 无法序列化 `ObjectId` → 导致 `ID cannot represent value` 错误

------

 3️⃣ 解决方法

方法 1️⃣ 使用 `toJSON` / `toObject` 并转换 `_id`

```
const savedBook = await book.populate('author', 'name');

const payload = {
  bookAdded: {
    ...savedBook.toJSON(),       // ObjectId 会被自动转换成字符串
    id: savedBook._id.toString() // 确保 id 是字符串
  }
};

pubsub.publish('BOOK_ADDED', payload);
return savedBook;
```

------

方法 2️⃣ 在 Mongoose schema 中设置 `toJSON` 转换

```
bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});
```

然后你直接：

```
pubsub.publish('BOOK_ADDED', { bookAdded: savedBook });
```

- 订阅返回的对象会自动把 `_id` 转成字符串，GraphQL ID 就能正确序列化了。

------

 4️⃣ 小结

- 错误原因：GraphQL 的 ID 类型不能直接序列化 MongoDB ObjectId/Buffer
- 解决方法：
  1. 手动把 `_id` 转成字符串
  2. 或者在 schema 中设置 `toJSON` 转换
- 一旦转换正确，订阅事件就不会报错，前端 `useSubscription` 的 `onData` 可以正常接收。

### 3。

你在两个地方都往 **Apollo Client cache** 里加了同一个新对象，所以组件渲染的时候，列表里出现了重复的数据。

具体情况：

- `PersonForm`（或你这边的 `AddBook` 表单）提交后，`mutation` 的 `update` 或者 `onCompleted` 回调里，已经调用过 `cache.updateQuery` 把新数据加进缓存。
- 同时你还在 **订阅 `BOOK_ADDED`** 里，又一次 `updateQuery`，再把同一个新对象加了一遍。
- 最终 Apollo cache 里出现了两份一模一样的数据，组件渲染时就显示重复。

### 4.

query {  allAuthors {    name     bookCount  } } 说是这里会有n+1问题，怎么复现这个问题

1. 你现在的 query

```
query {
  allAuthors {
    name 
    bookCount
  }
}
```

------

2. 服务端可能的 resolver 实现（常见写法）

```
const resolvers = {
  Query: {
    allAuthors: async () => {
      return Author.find({}); // 返回所有作者
    },
  },
  Author: {
    bookCount: async (root) => {
      // root = 单个 author
      return await Book.countDocuments({ author: root._id });
    },
  },
};
```

------

3. 这里会发生什么？

- `allAuthors` resolver 执行一次 → 查出 **所有作者**，假设有 `N` 个作者。
- GraphQL 再去解析每个作者的 `bookCount` 字段 → 每次都执行一次 `Book.countDocuments(...)` 查询。
- 总共：**1 + N 次查询**（这就是 N+1 问题）。

比如：

- 数据库有 10 个作者。
- 查询 `allAuthors { name bookCount }`。
- Mongo 查询次数：1（查所有作者）+ 10（每个作者查书籍数量） = **11 次**。

------

4. 如何复现

1. 在你的 MongoDB 中插入多个作者（比如 10 个）。

2. 用上面那段 resolver 实现。

3. 执行 query：

   ```
   query {
     allAuthors {
       name
       bookCount
     }
   }
   ```

4. 打开数据库 query log（或在 resolver 里加 `console.log(...)`）。
    你会看到：

   - `Author.find({})` 执行一次
   - `Book.countDocuments(...)` 执行 10 次

------

5. 怎么优化？

- 用 **DataLoader**（批处理 + 缓存）。
- 或者预先用 `aggregate` 一次性统计好每个作者的书籍数量。

### 5.

allAuthors 的请求为什么会带动Author里的bookCount？

```js
import Author from './models/author.js'
import Book from './models/book.js'

const resolvers = {
  Query: {
    allAuthors: async () => {
      console.log('allAuthors.find')
      return Author.find({})   // 这里查一次 → 1
    },
  },
  Author: {
    bookCount: async (root) => {
      console.log('counting books for', root.name)
      return await Book.countDocuments({ author: root._id }) // 每个作者查一次 → N
    },
  },
}

export default resolvers

```

1. 你请求的 Query

```
query {
  allAuthors {
    name
    bookCount
  }
}
```

GraphQL 的执行步骤是这样的：

- 先执行 `Query.allAuthors` → 返回一个 `Author` 数组（比如 3 个作者）。
- 然后 GraphQL 会遍历数组里的每个 Author，**根据 schema 里定义的字段解析函数（resolver）去取值**。

------

2. resolvers 结构

```
const resolvers = {
  Query: {
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root._id })
    },
  },
}
```

- `allAuthors` resolver 只负责返回作者列表。
- 但是你 query 里请求了 `bookCount` 字段，所以 **GraphQL 会进入 `Author.bookCount` resolver**，对每一个作者执行一次。

这就是为什么 `allAuthors` 请求会“带动” `Author.bookCount`。

------

3. N+1 的由来

- `allAuthors` → 1 次 DB 查询（拿到作者列表）。
- 对每个作者，GraphQL 又调用 `Author.bookCount` resolver → 每个作者 1 次 DB 查询。
- 所以变成了 **1 + N 次查询** → **N+1 问题**。

------

✅ 你如果只写：

```
query {
  allAuthors {
    name
  }
}
```

就只会执行一次 `Author.find`，不会触发 `bookCount` 的 resolver。

----------------------------

✅ 解决方案 1：在 Query 层批量查（聚合）

一次性把每个作者的书籍数量算出来，再返回。
 Mongoose 里可以用 `aggregate`：

```
Query: {
  allAuthors: async () => {
    const authors = await Author.find({})
    const counts = await Book.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } }
    ])

    // 把 count 映射成一个 Map
    const countMap = new Map()
    counts.forEach((c) => countMap.set(c._id.toString(), c.count))

    // 给每个作者加上 bookCount
    return authors.map((author) => ({
      ...author.toObject(),
      bookCount: countMap.get(author._id.toString()) || 0
    }))
  }
}
```

这样：

- 只会发 **2 次查询**（一次查作者，一次查聚合）。
- `Author.bookCount` resolver 就不需要单独写了，可以直接在返回对象里带上。

------

✅ 解决方案 2：用 DataLoader 批处理

如果你想保留 `Author.bookCount` 作为 field resolver，不改 Query 层逻辑，可以用 [dataloader](https://github.com/graphql/dataloader) 批量请求。

```
import DataLoader from 'dataloader'

const bookCountLoader = new DataLoader(async (authorIds) => {
  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: "$author", count: { $sum: 1 } } }
  ])

  const countMap = new Map()
  counts.forEach((c) => countMap.set(c._id.toString(), c.count))

  return authorIds.map((id) => countMap.get(id.toString()) || 0)
})

const resolvers = {
  Query: {
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: (root) => bookCountLoader.load(root._id)
  }
}
```

这样：

- GraphQL 在一次请求中访问多个作者的 `bookCount` 时，会被 dataloader 批量化 → 最终还是 1 次 DB 查询。

------

对比

| 方案                    | 优点                                     | 缺点                                                         |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| **聚合（方案1）**       | 简单直接、查询次数固定                   | Resolver 逻辑被“搬到” Query 层，缺少 field resolver 的灵活性 |
| **DataLoader（方案2）** | 保持 resolver 粒度，自动批处理，复用性强 | 多一层工具学习成本                                           |

------

👉 如果你只是练习项目 / 数据量不大，用 **方案 1（aggregate）** 就够了。
 👉 如果项目会规模化发展，推荐 **方案 2（DataLoader）**，是 GraphQL 处理 N+1 的标准解法。
