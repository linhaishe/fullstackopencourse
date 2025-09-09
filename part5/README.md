# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

前端本地的端口是 5171，服务端的端口是 3001，前端请求的时候默认走了 5171 的端口，怎么请求才能走 3001 呢

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
