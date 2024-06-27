import type { Rule } from 'ant-design-vue/es/form'

export interface IFormType {
  props?: {
    layout?: 'horizontal' | 'vertical' | 'inline'
    labelAlign?: 'left' | 'right'
    size?: 'large' | 'middle' | 'small'
    rules?: Record<string, Rule[]>
  }
  gutter: any
  span: number
  operate?: boolean
}

export interface IFormOptionsType {
  type: string
  name: string
  label: string
  required: boolean
  icon?: string
  props?: any
  options?: any[]
}

export interface IFormPropsType {
  formOptions: IFormType
  formOptionsData: IFormOptionsType[]
  formState: any
}
