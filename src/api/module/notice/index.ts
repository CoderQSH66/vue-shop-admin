import instance from '@/api/request'

import type { INoticeList } from '@/types/notice'

/**
 * 获取公告列表
 * @returns  {Promise<>}
 *
 */
export const getNoticeList = (page: number) => {
  return instance.request<INoticeList>({
    url: `/admin/notice/${page}`,
    method: 'get',
    isRequestData: true,
    requestType: 'form'
  })
}

/**
 * 增加公告
 * @param {string} title 标题
 * @param {string} content 内容
 * @returns  {Promise<>}
 *
 */
export const addNotice = (data: { title: string; content: string }) => {
  return instance.request({
    url: '/admin/notice',
    method: 'post',
    data,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * 修改公告
 * @param {number} id id
 * @param {string} title 标题
 * @param {string} content 内容
 * @returns  {Promise<any>}
 *
 */
export const updateNotice = (id: number, data: { title: string; content: string }) => {
  return instance.request({
    url: `/admin/notice/${id}`,
    method: 'post',
    data,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * 删除公告
 * @param {number} id id
 * @returns  {Promise<any>}
 */
export const deleteNotice = (id: number) => {
  return instance.request({
    url: `/admin/notice/${id}/delete`,
    method: 'post',
    isRequestData: true,
    requestType: 'urlencoded'
  })
}
