/* eslint-disable no-restricted-syntax */
import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

import { getIndexData, getRecentData } from '@/api'
import { iconNavs } from '@/utils/catagoryData'
import { local } from '@/utils/Storage'

import type { ITagsType, IPayData, ITimeType } from '@/types/home'

const useHomeStore = defineStore('homeStore', () => {
  // states
  const tagsList = ref<ITagsType[]>(
    local.get('tagsList') ?? [
      {
        name: '主控台',
        path: '/'
      }
    ]
  )
  const payData = ref<IPayData[]>([])
  const statusData = ref<any>({})
  const categoryList = ref<typeof iconNavs>(iconNavs)
  const echartData = ref<any>({})
  // actions
  /** 增加标签 */
  const addTags = (tagInfo: ITagsType) => {
    let isExits = false
    for (const item of tagsList.value) {
      if (item.path === tagInfo.path) {
        isExits = true
        break
      }
    }
    !isExits && tagsList.value.push(tagInfo)
  }
  /** 删除标签 */
  const removeTags = (targetKey: string, activeKey: string) => {
    if (targetKey === tagsList.value[0].path) return activeKey
    // 如果删除的是当前激活的标签，需要判断是否存在下一个标签
    if (targetKey === activeKey) {
      tagsList.value.forEach((tag, index) => {
        if (tag.path === targetKey) {
          const nextTag = tagsList.value[index + 1] || tagsList.value[index - 1]
          if (nextTag) {
            activeKey = nextTag.path
          }
        }
      })
    }

    tagsList.value = tagsList.value.filter((tag) => tag.path !== targetKey)

    // eslint-disable-next-line consistent-return
    return activeKey
  }
  /** 监听路由，动态缓存标签列表 */
  watchEffect(() => {
    local.set('tagsList', tagsList.value)
  })

  /** 获取首页统计数据 */
  const asyncGetHomeData = async (): Promise<boolean> => {
    const res = await getIndexData()
    payData.value = res[0].data.panels
    statusData.value = res[1].data
    return true
  }

  /** 获取不同时间图表数据 */
  const asyncGetRecentData = async (time: ITimeType) => {
    const res = await getRecentData(time)
    echartData.value = res.data
  }

  return {
    tagsList,
    payData,
    statusData,
    categoryList,
    echartData,
    removeTags,
    addTags,
    asyncGetHomeData,
    asyncGetRecentData
  }
})

export default useHomeStore
