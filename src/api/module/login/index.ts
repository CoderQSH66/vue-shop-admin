/**
 * 登录相关接口
 */
import instance from '@/api/request'

import type { ILoginRequest, IUserInfo, IUpdatePassword } from '@/types/login'

/**
 * 登录接口
 */
export const login = (data: ILoginRequest) => {
  return instance.request({
    url: '/admin/login',
    method: 'post',
    data,
    isRequestData: true,
    requestType: 'urlencoded',
    isShowMessage: true,
    successMessage: '登录成功'
  })
}

/**
 * 用户信息接口
 */
export const getUserInfo = () => {
  return instance.request<IUserInfo>({
    url: '/admin/getinfo',
    method: 'post',
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * 修改密码接口
 */
export const changePassword = (data: IUpdatePassword) => {
  return instance.request({
    url: '/admin/updatepassword',
    method: 'post',
    data,
    isRequestData: true
  })
}
