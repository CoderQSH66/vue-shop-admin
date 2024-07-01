import type { IFormOptionsType, IFormType } from '@/components/schema-form'

const formOptionsData: IFormOptionsType[] = [
  {
    type: 'input',
    label: '用户名',
    name: 'username',
    required: true
  },
  {
    type: 'password',
    label: '密码',
    name: 'password',
    required: true
  },
  {
    type: 'image-upload',
    label: '头像',
    name: 'file',
    required: false
  },
  {
    type: 'select',
    label: '角色',
    name: 'role',
    required: true,
    options: [
      {
        label: '角色一',
        value: '1'
      },
      {
        label: '角色二',
        value: '2'
      }
    ]
  },
  {
    type: 'switch',
    label: '状态',
    name: 'sataus',
    required: false
  }
]

const formOptions: IFormType = {
  gutterSpan: [0, 24],
  colSpan: 24,
  labelSpan: 4,
  operate: true,
  props: {
    layout: 'horizontal',
    size: 'large'
  }
}

const formState: any = {}

formOptionsData.forEach((item) => {
  formState[item.name] = ''
})

export { formOptionsData, formOptions, formState }
