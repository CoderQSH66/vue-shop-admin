import { Input, Select, SelectOption, DatePicker, RangePicker, Cascader } from 'ant-design-vue'

import type { FormProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'

export const componentsMap: any = {
  Input,
  Select,
  SelectOption,
  DatePicker,
  RangePicker,
  Cascader
}
export interface IFormItem {
  name: string
  type: string
  lable: string
  placeholder: string
  rules?: Rule[]
  typeOfChild?: string
  childOptions?: any
  options?: any[]
}
export interface ILayout {
  colSpan?: number
  gutterSpan?: number[]
  labelSpan?: number
}
export interface IFormPropsType {
  formProps: FormProps
  formItems: IFormItem[]
}
