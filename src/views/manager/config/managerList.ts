import type { IPropTableColumns, IPropTable } from '@/components/schema-table'

const columns: IPropTableColumns = [
  {
    title: '管理员',
    key: 'username',
    dataIndex: 'username',
    width: '30%'
  },
  {
    title: '所属角色',
    key: 'role',
    dataIndex: 'role',
    width: '20%'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: '20%',
    align: 'center'
  },
  {
    title: '操作',
    key: 'operate',
    dataIndex: 'operate',
    align: 'center'
  }
]

const tableOptions: IPropTable = {
  size: 'large',
  bordered: true
}

export { columns, tableOptions }
