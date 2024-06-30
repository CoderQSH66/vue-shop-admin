import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { getManagerList, updateManagerStatus } from '@/api'

import type { IManagerData } from '@/types/manager'

const useManagerStore = defineStore('manager', () => {
  // states
  const manageListData = reactive<IManagerData>({
    list: [],
    roles: [],
    totalCount: 0
  })
  // actions
  const asyncGetManagerList = async (page: number = 1, limit: number = 9999, keyword: string = '') => {
    const res = await getManagerList(page, limit, keyword)
    manageListData.list = res.data.list.map((item: any) => {
      item.loading = false
      return item
    })
    manageListData.roles = res.data.roles
    manageListData.totalCount = res.data.totalCount
  }
  const asyncUpdateManagerStatus = async (id: string, status: number): Promise<boolean> => {
    try {
      await updateManagerStatus(id, status)
      return true
    } catch (error) {
      return false
    }
  }
  return {
    manageListData,
    asyncGetManagerList,
    asyncUpdateManagerStatus
  }
})

export default useManagerStore
