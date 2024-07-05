import instance from '@/api/request'

import type { IManagerData } from '@/types/manager'

/**
 * 获取管理员列表
 * @param {number} page 页码
 * @param {number} limit 每页条数
 * @param {string} keyword 名称
 * @returns  {Promise<any>}
 *
 */
export const getManagerList = (page: number, limit: number, keyword: string = '') => {
  return instance.request<IManagerData>({
    method: 'get',
    url: `/admin/manager/${page}`,
    params: {
      limit,
      keyword
    },
    isRequestData: true,
    requestType: 'form'
  })
}

/**
 * 修改管理员状态
 * @param {number} id id
 * @param {number} status status
 * @returns  {Promise<any>}
 *
 */
export const updateManagerStatus = (id: string, status: number) => {
  return instance.request({
    method: 'post',
    url: `/admin/manager/${id}/update_status`,
    data: {
      status
    },
    isRequestData: true,
    requestType: 'urlencoded'
  })
}
/**
 * @description 添加管理员
 * @param {object} data 请求body： username、password、role_id、status、avatar
 * @returns {Promise<any>}
 */
export const addManager = (data: any) => {
  return instance.request({
    method: 'post',
    url: '/admin/manager',
    data,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * @description 修改管理员
 * @param { number } id 管理员id
 * @param { any }    data 修改内容
 * @returns {Promise<any>}
 *
 */
export const updateManager = (id: number, data: any) => {
  return instance.request({
    method: 'post',
    url: `/admin/manager/${id}`,
    data,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * @description 删除管理员
 * @param { id }  管理员id
 * @returns {Promise<any>}
 *
 */
export const deleteManager = (id: number) => {
  return instance.request({
    method: 'post',
    url: `/admin/manager/${id}/delete`,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * @description 获取角色列表
 * @param { number } page 页码
 * @returns {Promise<any>}
 *
 */
export const getRoleList = (page: number) => {
  return instance.request({
    method: 'get',
    url: `/admin/role/${page}`,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * @description 获取权限列表
 * @returns {Promise<any>}
 *
 */
export const getMenuRule = () => {
  return instance.request({
    url: '/admin/rule/1',
    isRequestData: true,
    requestType: 'form'
  })
}

/**
 * @description 添加菜单权限
 * @param { object } data：权限相关
 * @returns {Promise<any>}
 *
 */
export const addMenuRules = (data: any) => {
  return instance.request({
    method: 'post',
    url: '/admin/rule',
    data,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * @description 修改菜单权限
 * @param { object } data：权限相关
 * @param { number }  id: 菜单id
 * @returns {Promise<any>}
 *
 */
export const editMenuRules = (id: number, data: any) => {
  return instance.request({
    method: 'post',
    url: `/admin/rule/${id}`,
    data,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}
