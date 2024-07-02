import { defineStore } from 'pinia'
import { reactive } from 'vue'

import { getManagerList, updateManagerStatus, getRoleList, addManager, updateManager, deleteManager } from '@/api'

import type { IManagerData } from '@/types/manager'

const useManagerStore = defineStore('manager', () => {
  // states
  const manageListData = reactive<IManagerData>({
    list: [],
    roles: [],
    totalCount: 0
  })
  const selectImage = ref<any>({})
  const roleList = ref<any[]>([])
  const totalCount = ref<number>(0)
  const selectInjectImg = (image: any) => {
    selectImage.value = image
  }
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
  const asyncGetRoleList = async (page: number = 1) => {
    const res = await getRoleList(page)
    roleList.value?.push(...res.data.list)
    totalCount.value = res.data.totalCount
  }
  // 增加管理员
  const asyncAddManager = async (data: any) => {
    const res = await addManager(data)
    asyncGetManagerList()
  }
  // 修改管理员
  const asyncUpdateManager = async (id: number, data: any) => {
    const res = await updateManager(id, data)
    asyncGetManagerList()
  }
  // 删除管理员
  const asyncDeleteManager = async (id: number) => {
    await deleteManager(id)
    asyncGetManagerList()
  }
  return {
    manageListData,
    selectImage,
    roleList,
    totalCount,
    asyncGetManagerList,
    asyncUpdateManagerStatus,
    selectInjectImg,
    asyncGetRoleList,
    asyncAddManager,
    asyncUpdateManager,
    asyncDeleteManager
  }
})

export default useManagerStore
