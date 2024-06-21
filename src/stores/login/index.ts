import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { login, getUserInfo, changePassword } from '@/api'
import router from '@/router'
import asyncRouter from '@/router/asyncAddRouter'
import { local } from '@/utils/Storage'

import type { ILoginRequest, IUserInfo, IUpdatePassword } from '@/types/login'

const useLoginStore = defineStore('login', () => {
  /** state */
  const loading = ref<boolean>(false)
  const userInfo = ref<IUserInfo>(local.get('userInfo') ?? {})
  const menus = computed(() => {
    return userInfo.value.menus
  })
  const rules = computed(() => {
    return userInfo.value.ruleNames
  })

  /** actions */
  const asyncFetchLogin = async (loginInfo: ILoginRequest): Promise<any> => {
    loading.value = true
    const _login = await login(loginInfo)
    local.set('i-token', _login.data.token)

    const _userInfo = await asyncFetchGetUserInfo()
    local.set('userInfo', _userInfo)
    userInfo.value = _userInfo
    loading.value = false

    // 动态添加路由
    asyncRouter(menus.value)
    router.push('/')
  }
  const asyncFetchGetUserInfo = async () => {
    const res = await getUserInfo()
    return res.data
  }
  const asyncFetchChangePassword = async (data: IUpdatePassword): Promise<any> => {
    await changePassword(data)
  }

  return {
    loading,
    userInfo,
    menus,
    rules,
    asyncFetchLogin,
    asyncFetchChangePassword
  }
})

export default useLoginStore
