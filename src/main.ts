/* eslint-disable import/no-unresolved */
import '@/assets/main.css'
import 'virtual:uno.css'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import usePinia from './stores'
import registerAntIcons from './utils/registerAntIcon'
import registerEpIcons from './utils/registerEpIcon'

const app = createApp(App)
app.use(registerAntIcons)
app.use(registerEpIcons)
app.use(usePinia)
app.use(router)
app.mount('#app')
