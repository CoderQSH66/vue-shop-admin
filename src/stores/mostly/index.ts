import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getMostlyImageList } from '@/api'

import type { IImageListType } from '@/types/mostly'

const useMostlyStore = defineStore('mostly', () => {
  // states
  const imageClassList = ref<IImageListType[]>([])
  const imageClassTotal = ref<number>()
  const isSpinning = ref<boolean>(false)
  // actions
  const asyncGetMostlyImageList = async (page: number, limit: number = 10) => {
    isSpinning.value = true
    const res = await getMostlyImageList(page, limit)
    isSpinning.value = false
    imageClassList.value = res.data.list
    imageClassTotal.value = res.data.totalCount
  }
  return {
    imageClassList,
    imageClassTotal,
    isSpinning,
    asyncGetMostlyImageList
  }
})

export default useMostlyStore
