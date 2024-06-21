export interface ILoginRequest {
  username: string
  password: string
}

export interface IUserInfo {
  id: number
  username: string
  avatar: string
  super: number
  role: {
    id: number
    name: string
  }
  menus: any
  ruleNames: string[]
}
export interface IUpdatePassword {
  oldpassword: string
  password: string
  repassword: string
}
