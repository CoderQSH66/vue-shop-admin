import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import asyncAddRouter from '@/router/asyncAddRouter'

import useLoginStore from './login'

import type { App } from 'vue'

export default function usePinia(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
  const { menus } = useLoginStore()
  asyncAddRouter(menus)
}
