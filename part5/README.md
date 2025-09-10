# Test

The course previously used the [Jest](http://jestjs.io/) library developed by Facebook to test React components. We are now using the new generation of testing tools from Vite developers called [Vitest](https://vitest.dev/). Apart from the configurations, the libraries provide the same programming interface, so there is virtually no difference in the test code.

Let's start by installing Vitest and the [jsdom](https://github.com/jsdom/jsdom) library simulating a web browser:

```js
npm install --save-dev vitest jsdom
```

In addition to Vitest, we also need another testing library that will help us render components for testing purposes. The current best option for this is [react-testing-library](https://github.com/testing-library/react-testing-library) which has seen rapid growth in popularity in recent times. It is also worth extending the expressive power of the tests with the library [jest-dom](https://github.com/testing-library/jest-dom).

```
import { defineConfig } from 'vitest/config';

import { defineConfig } from 'vite'
```

**`vitest/config`** 内部其实就是 re-export 了 Vite 的 `defineConfig`，只是多加了对 `test` 字段的类型支持。

所以你引入 `defineConfig` 从 `vitest/config`，它依旧是 Vite 的配置函数，不会影响你原来写的 `plugins`、`server` 等 Vite 配置。

额外的好处是：`test` 字段在类型提示里就不会报错。

等于是 **在原本的 Vite config 基础上扩展了 Vitest 的配置**。

# QA

## 1. 前端本地的端口是 5171，服务端的端口是 3001，前端请求的时候默认走了 5171 的端口，怎么请求才能走 3001 呢

1. 写全 URL

直接在前端请求里指定完整地址：

```
fetch('http://localhost:3001/api/login', {
  method: 'POST',
  body: JSON.stringify({ username, password }),
  headers: { 'Content-Type': 'application/json' },
});
```

这样就不会默认走 5171，而是请求 3001。

2. 使用 Vite 的 代理 (proxy)

更常见的做法是用 开发环境代理，让前端看起来请求同源 /api/...，但 Vite 在 dev server 自动帮你转发到 3001。

在 vite.config.ts 里配置：

```
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
```

然后前端就可以直接写：

```
fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ username, password }),
  headers: { 'Content-Type': 'application/json' },
});
```

Vite 会把 /api/login 转发到 http://localhost:3001/api/login。

3. 区分开发和生产环境

建议把后端地址写在 .env 文件里，不要写死：

```
.env.development

VITE_API_BASE=http://localhost:3001

.env.production

VITE_API_BASE=https://your-production-server.com
```

前端代码里：

```
const API_BASE = import.meta.env.VITE_API_BASE;

fetch(`${API_BASE}/api/login`, {
  method: 'POST',
  ...
});
```

这样你本地是 3001，线上是生产地址，切换很方便。

👉 建议：

如果只是临时测试 → 用 写全 URL。

如果是长期开发 → 用 proxy 配置 或 环境变量。

## 2. setState 里 更新对象属性里的某个值，概述和处理

---

### 1. 概述

在 React 中，`useState` 管理对象时，**不要直接修改原对象**，而是要用 **不可变更新** 的方式。
也就是说：用展开运算符（`...`）或者函数式更新来生成一个新对象，再传给 `setState`。

---

### 2. 常见场景与写法

#### ✅ 场景 1：简单对象更新

```
const [user, setUser] = useState({ name: 'Tom', age: 20 });

// 更新 age
setUser({ ...user, age: 21 });
```

#### ✅ 场景 2：函数式更新（推荐）

当新的值依赖旧的 state 时，建议用函数式更新：

```
setUser(prev => ({ ...prev, age: prev.age + 1 }));
```

---

#### ✅ 场景 3：嵌套对象更新

如果对象里有嵌套结构，需要层层展开：

```
const [form, setForm] = useState({
  user: { name: 'Tom', age: 20 },
  settings: { darkMode: false }
});

// 更新 user.name
setForm(prev => ({
  ...prev,
  user: { ...prev.user, name: 'Jerry' }
}));
```

---

#### ✅ 场景 4：动态 key 更新

当要更新的属性名是变量时：

```
const updateField = (key: string, value: any) => {
  setUser(prev => ({ ...prev, [key]: value }));
};
```

---

### 3. 注意事项

1. **不要直接修改原对象**，比如：

   ```
   user.age = 21;
   setUser(user); // ❌ React 可能不会触发更新
   ```

2. 对于复杂嵌套对象，更新会比较繁琐，可以考虑：

   - `useReducer`
   - `immer` 库（允许写“可变”的写法，底层自动生成不可变对象）

---

👉 总结：

- **浅层对象** → 用 `...` 展开
- **依赖旧值** → 用函数式更新
- **嵌套对象** → 层层展开或用 `immer`
- **动态 key** → `setUser(prev => ({ ...prev, [key]: value }))`

---

待解决问题

1. msg 连续两次错误则不会在展示
2. ts
3. 修正 node 的笔记，服务端的 test 应该有更适合的 test lib

---
