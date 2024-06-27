import instance from '@/api/request'

import type { IImageClassType, ICateType, IImageList } from '@/types/mostly'

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

/** 修改图库 */
export const updateImageCate = (id: number, data: ICateType) => {
  return instance.request({
    method: 'post',
    url: `/admin/image_class/${id}`,
    data,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/** 删除图库 */
export const deleteImageCate = (id: number) => {
  return instance.request({
    method: 'post',
    url: `/admin/image_class/${id}/delete`,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/** 添加图库 */
export const addImageCate = (data: ICateType) => {
  return instance.request({
    method: 'post',
    url: `/admin/image_class`,
    data,
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/** 获取图片列表 */
export const getImageList = (id: number, page: number, limit: number = 10) => {
  return instance.request<IImageList>({
    method: 'get',
    url: `/admin/image_class/${id}/image/${page}`,
    params: {
      limit
    },
    isRequestData: true,
    requestType: 'form'
  })
}
