import isPromission from '@/utils/isPremission'
import { local } from '@/utils/Storage'

import type { App } from 'vue'

const Vpremission = (app: App) => {
  app.directive('premission', {
    mounted(el, binding) {
      const roleNames = local.get('userInfo')?.ruleNames
      !isPromission(roleNames, binding.value) && el.parentNode.removeChild(el)
    }
  })
}
export default Vpremission
