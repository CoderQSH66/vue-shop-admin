import type { IFormOptionsType, IFormType } from '@/components/schema-form'

const formOptionsData: IFormOptionsType[] = [
  {
    type: 'select',
    label: '上级菜单',
    name: 'rule_id',
    required: true
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
    type: 'select',
    label: '菜单图标',
    name: 'icon',
    required: false,
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
  },
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
  },
  {
    type: 'input-number',
    label: '排序',
    name: 'order',
    required: false
  }
]

const formOptions: IFormType = {
  gutterSpan: [0, 12],
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
  if (item.name === 'menu') {
    formState[item.name] = 1
    return
  }
  formState[item.name] = ''
})

export { formOptionsData, formOptions, formState }
