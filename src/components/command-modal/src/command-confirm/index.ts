import { createApp } from 'vue'

import { CommandModal, type IModalProps } from '@/components/command-modal'

export default function showModal(props: IModalProps) {
  const app = createApp(CommandModal, props)
  const div = document.createElement('div')
  document.body.appendChild(div)
  app.mount(div)
  return () => {
    app.unmount()
    document.body.removeChild(div)
  }
}
