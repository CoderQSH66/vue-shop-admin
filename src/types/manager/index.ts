export interface IRoleData {
  id: number
  name: string
}
export interface IManagerListData {
  avatar: string
  create_time: string
  update_time: string
  id: number
  role: IRoleData
  role_id: number
  statusL: number
  super: number
  username: string
}
export interface IManagerData {
  list: IManagerListData[]
  roles: IRoleData[]
  totalCount: number
}
