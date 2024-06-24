import instance from '@/api/request'

import type { IImageClassType } from '@/types/mostly'
/** 获取图库列表 */
export const getMostlyImageList = (page: number, limit: number = 10) => {
  return instance.request<IImageClassType>({
    method: 'get',
    url: `/admin/image_class/${page}`,
    params: {
      limit
    },
    isRequestData: true,
    requestType: 'form'
  })
}
