import type { ColumnType } from 'ant-design-vue/es/table/interface'

export interface IPropTable {
  sticky?: boolean
  bordered?: boolean
  size?: 'middle' | 'small' | 'large'
}
export type IPropTableColumns = ColumnType & IExpand
export interface IExpand {
  operate?: boolean
}
export interface IPropTableOptions {
  columns: IPropTableColumns[]
  dataSource: any[]
  tableOptions?: IPropTable
}
