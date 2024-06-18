/* eslint-disable import/no-unresolved */
import '@/assets/main.css'
import 'virtual:uno.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
