import type { ColumnType } from 'ant-design-vue/es/table/interface'

export interface IPropTable {
  sticky?: boolean
  bordered?: boolean
  size?: 'middle' | 'small' | 'large'
}

export type IPropTableColumns = ColumnType<any>[]

type PositionType = 'topLeft' | 'topRight' | 'topCenter ' | 'bottomCenter' | 'bottomLeft' | 'bottomRight'
export interface IPagination {
  position?: PositionType[]
  total?: number
  pageSize?: number
  current?: number
  defaultPageSize?: number
  pageSizeOptions?: number[]
  showSizeChanger?: boolean
  showTotal?: (total: number) => string
  onChange?: (page: number, pageSize: number) => void
}

export interface IPropTableOptions {
  columns: IPropTableColumns
  dataSource: any[]
  tableOptions?: IPropTable
  pagination?: IPagination | any
}
