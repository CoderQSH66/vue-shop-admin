import type { IPropTableColumns, IPropTable } from '@/components/schema-table'

const columns: IPropTableColumns = [
  {
    title: '公告名称',
    dataIndex: 'title',
    key: 'title',
    width: '15%',
    align: 'center'
  },
  {
    title: '公告内容',
    dataIndex: 'content',
    key: 'content',
    width: '30%',
    align: 'center'
  },
  {
    title: '发布时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width: '20%',
    align: 'center'
  },
  {
    title: '修改时间',
    dataIndex: 'update_time',
    key: 'update_time',
    width: '20%',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    align: 'center'
  }
]
const tableOptions: IPropTable = {
  size: 'large',
  bordered: true
}
export { columns, tableOptions }
