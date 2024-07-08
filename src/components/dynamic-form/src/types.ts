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
  type: keyof typeof componentsMap
  name: string
  label: string
  placeholder?: string | string[]
  required?: boolean
  rules?: Rule[]
  typeOfChild?: string
  childOptions?: any
  options?: any[]
  slotName?: string
  valueFormat?: string
  multiple?: boolean
}
export interface ILayout {
  colSpan?: number
  gutterSpan?: number | object
  labelSpan?: number
}
export interface IFormPropsType {
  formProps?: FormProps
  formLayout?: ILayout
  formItems: IFormItem[]
  formState: any
}
