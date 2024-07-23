import type { IFormOptionsType, IFormType } from '@/components/schema-form'

const formOptionsData: IFormOptionsType[] = [
  {
    type: 'cascader',
    label: '上级菜单',
    name: 'rule_id',
    required: true,
    props: {
      options: [],
      placeholder: '请选择上级菜单',
      'field-names': {
        label: 'name',
        value: 'id',
        children: 'child'
      },
      'change-on-select': true,
      showCheckedStrategy: 'Cascader.SHOW_CHILD',
      size: 'large'
    }
  },
  {
    type: 'radio',
    label: '菜单/规则',
    name: 'menu',
    required: false,
    props: {
      optionType: 'button',
      size: 'samll'
    },
    options: [
      {
        label: '菜单',
        value: 1
      },
      {
        label: '规则',
        value: 0
      }
    ]
  },
  {
    type: 'input',
    label: '名称',
    name: 'name',
    required: true,
    props: {
      placeholder: '请输入名称'
    }
  },
  {
    type: 'input-number',
    label: '排序',
    name: 'order',
    required: false
  }
]

const formOptionsMenu1: IFormOptionsType[] = [
  {
    type: 'select',
    label: '菜单图标',
    name: 'icon',
    required: false,
    props: {
      placeholder: '请选择图标',
      showSearch: true
    },
    options: [
      {
        label: '图标1',
        value: '1',
        icon: 'user'
      }
    ]
  },
  {
    type: 'input',
    label: '前端路由',
    name: 'frontpath',
    required: false,
    props: {
      placeholder: '请输入路由'
    }
  }
]
const formOptionsMenu2: IFormOptionsType[] = [
  {
    type: 'input',
    label: '后端规则',
    name: 'condition',
    required: false,
    props: {
      placeholder: '请输入规则'
    }
  },
  {
    type: 'input',
    label: '请求方式',
    name: 'method',
    required: false,
    props: {
      placeholder: '请输入请求方式'
    }
  }
]

const formOptions: IFormType = {
  gutterSpan: [0, 12],
  colSpan: 24,
  labelSpan: 4,
  operate: true,
  props: {
    layout: 'horizontal',
    size: 'large',
    rules: {
      condition: [
        {
          required: true,
          message: '请输入后端规则',
          trigger: 'blur'
        }
      ]
    }
  }
}

const formState: any = {}

formOptionsData.forEach((item) => {
  if (item.name === 'menu') {
    formState[item.name] = 1
    return
  }
  if (item.name === 'order') {
    formState[item.name] = 50
    return
  }
  formState[item.name] = ''
})
formOptionsMenu1.forEach((item) => {
  formState[item.name] = ''
})
formOptionsMenu2.forEach((item) => {
  formState[item.name] = ''
})

export { formOptionsData, formOptionsMenu1, formOptionsMenu2, formOptions, formState }
