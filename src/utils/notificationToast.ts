import { type NotificationPlacement, notification } from 'ant-design-vue'

type OptionsType = {
  message: string
  description?: string
  placement?: NotificationPlacement
  duration?: number
}
type Typetype = 'success' | 'info' | 'warning' | 'error'
// const [api, contextHolder] = notification.useNotification()

export const notifyToast = (type: Typetype, options: OptionsType) => {
  notification[type](options)
}
