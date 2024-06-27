/* eslint-disable prefer-destructuring */
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getMostlyImageList, updateImageCate, deleteImageCate, addImageCate, getImageList } from '@/api'

import type { IImageListType, ICateType, IImageList } from '@/types/mostly'

const useMostlyStore = defineStore('mostly', () => {
  // states
  const imageClassList = ref<IImageListType[]>([])
  const imageClassItem1 = ref<IImageListType>({})
  const imageClassTotal = ref<number>()
  const isSpinning = ref<boolean>(false)
  const isMainSpinning = ref<boolean>(false)
  const imageList = ref<IImageList>({})

  // actions
  const asyncGetMostlyImageList = async (page: number, limit: number = 10) => {
    isSpinning.value = true
    const res = await getMostlyImageList(page, limit)
    isSpinning.value = false
    imageClassList.value = res.data.list
    imageClassItem1.value = res.data.list[0]
    imageClassTotal.value = res.data.totalCount
    asyncGetImageList(imageClassItem1.value.id as number, 1)
  }
  const asyncUpdateImageCate = async (id: number, data: ICateType) => {
    const res = await updateImageCate(id, data)
    // console.log(res)
  }
  const asyncDeleteImageCate = async (id: number) => {
    const res = await deleteImageCate(id)
    // console.log(res)
  }
  const asyncAddImageCate = async (data: ICateType) => {
    const res = await addImageCate(data)
    console.log(res)
  }
  const asyncGetImageList = async (id: number, page: number, limit: number = 10) => {
    isMainSpinning.value = true
    const res = await getImageList(id, page, limit)
    isMainSpinning.value = false
    imageList.value = res.data
    // console.log(res)
  }
  return {
    imageClassList,
    imageClassTotal,
    imageClassItem1,
    isSpinning,
    imageList,
    isMainSpinning,
    asyncGetMostlyImageList,
    asyncUpdateImageCate,
    asyncDeleteImageCate,
    asyncAddImageCate,
    asyncGetImageList
  }
})

export default useMostlyStore
