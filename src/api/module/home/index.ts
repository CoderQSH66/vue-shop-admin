/**
 * 首页相关接口
 */
import instance from '@/api/request'

import type { ITimeType } from '@/types/home'

/** 获取支付数据 */
export const getPayData = () => {
  return instance.request({
    url: '/admin/statistics1',
    method: 'get',
    isRequestData: true,
    requestType: 'form'
  })
}

/** 获取商品状态数据 */
export const getStatusData = () => {
  return instance.request({
    url: '/admin/statistics2',
    method: 'get',
    isRequestData: true,
    requestType: 'form'
  })
}

/** 获取最近数据 */
export const getRecentData = (type: ITimeType) => {
  return instance.request({
    url: '/admin/statistics3',
    method: 'get',
    params: {
      type
    },
    isRequestData: true,
    requestType: 'form'
  })
}

/** 并发获取首页数据 */
export const getIndexData = () => {
  return Promise.all([getPayData(), getStatusData()])
}
