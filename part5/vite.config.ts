import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/**
 * Vite 的 server.proxy 配置 只在开发环境（vite dev）生效，因为它的作用是：在本地开发时，把你的请求从 5171 → 转发到 3001。
 */
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        // changeOrigin: true,
      },
    },
  },
})
