import type { IFormOptionsType, IFormType } from '@/components/schema-form'

const formOptionsData: IFormOptionsType[] = [
  {
    type: 'input',
    label: '分类名称',
    name: 'name',
    required: true
  },
  {
    type: 'input-number',
    label: '排序',
    name: 'order',
    required: false,
    props: {
      min: 0
    }
  }
]
const formOptions: IFormType = {
  gutter: [24],
  span: 24,
  props: {
    size: 'large',
    rules: {
      name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
    }
  }
}
export { formOptionsData, formOptions }
