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
