/* eslint-disable import/no-unresolved */
import '@/assets/main.css'
import 'virtual:uno.css'
import '@/styles/index.scss'
import { createApp } from 'vue'

import registerPromission from '@/directions/premission'

import App from './App.vue'
import router from './router'
import usePinia from './stores'
import registerAntIcons from './utils/registerAntIcon'
import registerEpIcons from './utils/registerEpIcon'

const app = createApp(App)
app.use(registerAntIcons)
app.use(registerEpIcons)
app.use(usePinia)
app.use(registerPromission)
app.use(router)
app.mount('#app')
