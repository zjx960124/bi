import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import vueJsx from '@vitejs/plugin-vue-jsx'; // 使用jsx
import Components from 'unplugin-vue-components/vite'; // 按需自动引入组件
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers'); // 引入UI组件库解析器
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
export default defineConfig({
  // 查看 插件 API 获取 Vite 插件的更多细节 https://www.vitejs.net/guide/api-plugin.html
  plugins: [
    vue(),
    viteMockServe({ supportTs: false }),
    vueJsx(),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/page/demo'],
      // ui库解析器
      resolvers: [ElementPlusResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
    }),
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [path.resolve(__dirname, 'src/svg')],
      // 执行 icon name 的格式
      symbolId: 'icon-[name]',
    }),
  ],
  base: './',
  resolve: {
    // resolve.alias: 更轻松地为import或require某些模块创建别名
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
      '@store': path.resolve(__dirname, './src/store'),
    },
  },
  build: {
    outDir: 'dist',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    https: false,
    open: true,
    host: '0.0.0.0',
    port: 8001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后台接口
        changeOrigin: true,
        // secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        // 截取api，并用api代替
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
      '/gapi': {
        target: 'http://localhost:8001/', //对mock进行代理，为了区别非mock的代理
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gapi/, ''),
      },
    },
  },
  // 引入第三方的配置
  optimizeDeps: {
    include: [],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/common/style.scss";`,
      },
    },
  },
});
