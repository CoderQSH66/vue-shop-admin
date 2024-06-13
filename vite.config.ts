import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import VueDevTools from 'vite-plugin-vue-devtools'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    // 自动导入组件
    AutoImport({
      resolvers: [AntDesignVueResolver()],
      // 指定在types文件中
      dts: './types/auto-imports.d.ts'
    }),
    // 全局注册组件
    Components({
      resolvers: [AntDesignVueResolver()],
      // 指定在types文件中
      dts: './types/components.d.ts'
    }),
    // 全局样式
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => `ant-design-vue/es/${name}/style/index`
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
