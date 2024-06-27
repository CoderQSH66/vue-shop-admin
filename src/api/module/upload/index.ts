import instance from '@/api/request'

/**
 * 删除图片接口
 * @param {number[]} ids 图片id数组
 * @returns  {Promise<>}
 */
export const deleteImage = (ids: number[]) => {
  return instance.request({
    method: 'post',
    url: '/admin/image/delete_all',
    data: {
      ids
    },
    isRequestData: true,
    requestType: 'urlencoded'
  })
}

/**
 * 修改图片名称
 * @param {number} id 图片id
 * @param {string} name 图片名称
 * @returns  {Promise<>}
 */
export const updateImageName = (id: number, name: string) => {
  return instance.request({
    method: 'post',
    url: `/admin/image/${id}`,
    data: {
      name
    },
    isRequestData: true,
    requestType: 'urlencoded'
  })
}
