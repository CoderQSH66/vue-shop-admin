import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
// 自动导入API
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 自动导入组件
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// antdesign无需通过插件自动引入样式
// import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
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
      dts: './types/components.d.ts',
      extensions: ['vue'],
      // 导入自己的组件
      dirs: ['src/views/**/*.vue', 'src/components/**/*.vue']
    }),
    UnoCSS()
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
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
