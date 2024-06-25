export interface IFormType {
  props?: {
    layout?: 'horizontal' | 'vertical' | 'inline'
    labelAlign?: 'left' | 'right'
    size?: 'large' | 'middle' | 'small'
  }
  gutter?: number | number[]
  span?: number
}

export interface IFormOptionsType {
  type: string
  name: string
  label: string
  required: boolean
  props?: any
  options?: any[]
}

export interface IFormPropsType {
  formOptions: IFormType
  formOptionsData: IFormOptionsType[]
}
