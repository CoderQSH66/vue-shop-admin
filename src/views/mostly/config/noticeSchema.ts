import type { IPropTableColumns } from '@/components/schema-table'

const columns: IPropTableColumns = [
  {
    title: '公告名称',
    dataIndex: 'name',
    key: 'name',
    width: '30%',
    align: 'center'
  },
  {
    title: '发布时间',
    dataIndex: 'time',
    key: 'time',
    width: '30%',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    align: 'center'
  }
]

export { columns }
