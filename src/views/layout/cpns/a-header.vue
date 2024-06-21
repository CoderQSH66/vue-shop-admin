<template>
  <div class="header" flex justify-between>
    <div class="left">
      <a-tooltip :title="isCollapsible ? '展开' : '收起'">
        <div class="collapsible" @click="isCollapsible = !isCollapsible">
          <div v-if="!isCollapsible" class="w-25 h-25 m-x-10 i-ant:menu-fold-outlined"></div>
          <div v-else class="w-25 h-25 m-x-10 i-ant:menu-unfold-outlined"></div>
        </div>
      </a-tooltip>
      <a-tooltip title="刷新">
        <div class="w-25 h-25 m-x-10 i-ant:sync-outlined"></div>
      </a-tooltip>
    </div>
    <div class="right">
      <a-tooltip :title="isFull ? '退出全屏' : '全屏'">
        <div v-if="!isFull" @click="fullscreen" class="w-25 h-25 m-x-20 i-ant:expand-outlined"></div>
        <div v-else @click="fullscreen" class="w-25 h-25 m-x-20 i-ant:fullscreen-exit-outlined"></div>
      </a-tooltip>
      <div class="avatar">
        <a-dropdown arrow placement="bottom">
          <div class="info flex-center">
            <a-avatar :size="38" :src="userInfo.avatar">
              <template #icon>
                <div class="i-ant:user-outlined w-full h-full text-blueGray"></div>
              </template>
            </a-avatar>
            <div class="username">{{ userInfo.username }}</div>
          </div>
          <template #overlay>
            <a-menu class="header-dropdown">
              <a-menu-item class="header-dropdown__item" @click="isOpenDrawer = true">修改密码</a-menu-item>
              <a-menu-item class="header-dropdown__item" @click="logout">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
  <a-drawer
    :open="isOpenDrawer"
    title="修改密码"
    class="drawer-custom-class"
    placement="right"
    @close="isOpenDrawer = false"
  >
    <a-form :model="formState" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
      <a-form-item label="旧密码" required>
        <a-input v-model:value="formState.oldpassword" placeholder="请输入旧密码" allow-clear size="large">
          <template #prefix>
            <i class="i-ant-user-outlined w-20 h-20"></i>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="新密码" required>
        <a-input v-model:value="formState.password" placeholder="请输入新密码" allow-clear size="large">
          <template #prefix>
            <i class="i-ant-setting-outlined w-20 h-20"></i>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="再次输入新密码" required>
        <a-input v-model:value="formState.repassword" placeholder="请再次输入新密码" allow-clear size="large">
          <template #prefix>
            <i class="i-ant-setting-outlined w-20 h-20"></i>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <div class="w-full opreate flex justify-around">
          <a-button type="primary" class="w-100" @click="updatePassword">确定</a-button>
          <a-button type="primary" danger class="w-100" @click="isOpenDrawer = false">取消</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup lang="ts">
  import { ref, toRefs, reactive } from 'vue'
  import { useRouter } from 'vue-router'

  import useLoginStore from '@/stores/login'
  import { local } from '@/utils/Storage'

  const loginStore = useLoginStore()
  const { userInfo } = toRefs(loginStore)
  const router = useRouter()
  const isCollapsible = ref<boolean>(false)
  const isFull = ref<boolean>(false)
  const isOpenDrawer = ref<boolean>(false)
  const formState = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })

  /** 全屏 */
  const fullscreen = () => {
    // DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
    const full = document.fullscreenElement
    // 切换为全屏模式
    if (!full) {
      // 文档根节点的方法requestFullscreen,实现全屏模式
      document.documentElement.requestFullscreen()
      isFull.value = true
    } else {
      // 变为不是全屏模式->退出全屏模式
      document.exitFullscreen()
      isFull.value = false
    }
  }

  /** 修改密码 */
  const updatePassword = async () => {
    try {
      await loginStore.asyncFetchChangePassword(formState)
    } catch (err) {
      isOpenDrawer.value = false
    }
  }

  /** 退出登录 */
  const logout = () => {
    local.clear()
    router.push('/login')
  }

  defineExpose({
    isCollapsible
  })
</script>

<style lang="scss" scoped>
  .header {
    @apply w-full h-full text-white;

    .left {
      @apply flex items-center;

      .ant-dropdown::after {
        background-color: red;
      }
    }

    .right {
      @apply flex items-center;

      .avatar {
        .username {
          @apply m-l-5 m-r-10;
        }
      }
    }
  }

  .header-dropdown {
    width: 100px;
    height: 100px;

    :deep(.header-dropdown__item) {
      margin: 10px 0 !important;
    }
  }
</style>
