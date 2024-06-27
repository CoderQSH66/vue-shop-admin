export interface IModalProps {
  [key: string]: any
  open: boolean
  title: string
  closable?: boolean
  width?: number
  cancelText?: string
  okText?: string
  footer?: string
  centered?: boolean
  onOk?: () => void
}
