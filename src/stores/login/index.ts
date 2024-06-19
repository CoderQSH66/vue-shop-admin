import { defineStore } from 'pinia'
import { ref } from 'vue'

import { login, getUserInfo } from '@/api/module/login'
import router from '@/router'
import { local } from '@/utils/Storage'

import type { ILoginRequest, IUserInfo } from '@/types/login'

const useLoginStore = defineStore('login', () => {
  /** state */
  const loading = ref<boolean>(false)
  const userInfo = ref<IUserInfo>(local.get('userInfo') ?? {})

  /** actions */
  const asyncFetchLogin = async (loginInfo: ILoginRequest): Promise<boolean> => {
    loading.value = true
    const _login = await login(loginInfo)
    local.set('i-token', _login.data.token)

    const _userInfo = await asyncFethGetUserInfo()
    local.set('userInfo', _userInfo)
    userInfo.value = _userInfo
    loading.value = false
    router.push('/')
  }
  const asyncFethGetUserInfo = async () => {
    const res = await getUserInfo()
    return res.data
  }

  return {
    loading,
    userInfo,
    asyncFetchLogin
  }
})

export default useLoginStore
