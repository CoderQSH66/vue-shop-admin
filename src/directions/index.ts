import Vpremission from './premission'

import type { App } from 'vue'

const registerPromission = (app: App) => {
  app.use(Vpremission)
}

export default registerPromission
