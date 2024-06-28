import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { getNoticeList, addNotice, updateNotice, deleteNotice } from '@/api'

import type { INoticeList } from '@/types/notice'

const useNoticeSore = defineStore('notice', () => {
  // states
  const noticeListState = reactive<INoticeList>({
    list: [],
    totalCount: 0
  })

  // actions
  const asyncGetNoticeList = async (page: number = 1) => {
    const res = await getNoticeList(page)
    noticeListState.list = res.data.list
    noticeListState.totalCount = res.data.totalCount
  }
  const asyncAddNotice = async (data: { title: string; content: string }) => {
    const res = await addNotice(data)
    asyncGetNoticeList()
  }
  const asyncUpdateNotice = async (id: number, data: { title: string; content: string }) => {
    const res = await updateNotice(id, data)
    asyncGetNoticeList()
    // console.log(res)
  }
  const asyncDeleteNotice = async (id: number) => {
    const res = await deleteNotice(id)
    asyncGetNoticeList()
  }
  return {
    noticeListState,
    asyncGetNoticeList,
    asyncAddNotice,
    asyncUpdateNotice,
    asyncDeleteNotice
  }
})

export default useNoticeSore
