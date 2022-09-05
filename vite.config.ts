/*
 * @Date: 2022-09-05 16:34:02
 * @LastEditors: YeKe
 * @LastEditTime: 2022-09-05 17:11:27
 * @FilePath: \vue3-vite-uniapp\vite.config.ts
 */
import { defineConfig } from 'vite'
import { resolve } from 'path'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
  server: {
    // host: '0.0.0.0', //ip地址
    port: 8080, //端口号
    open: true, //启动后是否自动打开浏览器
  },
})
