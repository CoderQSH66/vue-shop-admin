import type { IFormOptionsType, IFormType } from '@/components/schema-form'

const formOptionsData: IFormOptionsType[] = [
  {
    type: 'input',
    label: '公告名称',
    name: 'title',
    required: true
  },
  {
    type: 'textarea',
    label: '公告内容',
    name: 'content',
    required: true,
    props: {
      showCount: true,
      allowClear: true,
      maxlength: 200,
      autoSize: {
        minRows: 5
      }
    }
  }
]
const formOptions: IFormType = {
  gutter: [24],
  span: 24,
  props: {
    size: 'large',
    rules: {
      title: [{ required: true, message: '请公告标题', trigger: 'blur' }],
      content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
    }
  }
}
export { formOptionsData, formOptions }
