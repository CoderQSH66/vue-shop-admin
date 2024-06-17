import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
// 自动导入API
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 自动导入组件
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// antdesign无需通过插件自动引入样式
// import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
import VueDevTools from 'vite-plugin-vue-devtools'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    // 自动导入API
    AutoImport({
      resolvers: [AntDesignVueResolver()],
      // 指定在types文件中
      dts: './types/auto-imports.d.ts'
    }),
    // 自动导入组件
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ],
      // 指定在types文件中
      dts: './types/components.d.ts'
    })
    // 自动导入样式
    // createStyleImportPlugin({
    //   resolves: [AntdResolve()]
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://apis.juhe.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
