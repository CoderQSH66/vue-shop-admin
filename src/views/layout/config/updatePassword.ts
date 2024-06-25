import type { IFormOptionsType, IFormType } from '@/components/schema-form'

const formOptionsData: IFormOptionsType[] = [
  {
    type: 'input',
    label: '旧密码',
    name: 'oldpassword',
    required: true,
    icon: 'i-ant-setting-outlined',
    props: {
      placeholder: '请输入旧密码'
    }
  },
  {
    type: 'input',
    label: '新密码',
    name: 'password',
    required: true,
    icon: 'i-ant-setting-outlined',

    props: {
      placeholder: '请输入新密码'
    }
  },
  {
    type: 'input',
    label: '再次输入新密码',
    icon: 'i-ant-setting-outlined',

    name: 'repassword',
    required: true,
    props: {
      placeholder: '请再次输入新密码'
    }
  }
]
const formOptions: IFormType = {
  gutter: [24],
  span: 24,
  props: {
    size: 'large',
    rules: {
      oldpassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { min: 3, max: 5, message: '请输入正确的密码', trigger: 'change' }
      ],
      password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
      repassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { min: 3, max: 5, message: '两次密码不一致', trigger: 'change' }
      ]
    }
  }
}
export { formOptionsData, formOptions }
