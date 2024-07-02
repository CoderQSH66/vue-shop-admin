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
    name: 'avatar',
    required: false
  },
  {
    type: 'select',
    label: '角色',
    name: 'role_id',
    required: true,
    options: []
  },
  {
    type: 'switch',
    label: '状态',
    name: 'status',
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
    size: 'large',
    rules: {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 16, message: '请输入3~16位的用户名', trigger: 'change' }
      ],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      role_id: [{ required: true, message: '请选择角色', trigger: 'blur' }]
    }
  }
}

const formState: any = {}

formOptionsData.forEach((item) => {
  formState[item.name] = ''
})

export { formOptionsData, formOptions, formState }
