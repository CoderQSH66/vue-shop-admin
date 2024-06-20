/**
 * 登录相关接口
 */
import instance from '@/api/request'

import type { ILoginRequest, IUserInfo } from '@/types/login'

/**
 * 登录接口
 */
export const login = (data: ILoginRequest) => {
  return instance.request({
    url: '/admin/login',
    method: 'post',
    data,
    isRequestData: true,
    requestType: 'urlencoded'
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
