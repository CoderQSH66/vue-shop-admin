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
            <a-avatar :size="36" :src="userInfo.avatar">
              <template #icon>
                <div class="i-ant:user-outlined w-full h-full text-blueGray"></div>
              </template>
            </a-avatar>
            <div class="username">{{ userInfo.username }}</div>
          </div>
          <template #overlay>
            <a-menu class="header-dropdown">
              <a-menu-item class="header-dropdown__item" @click="updatePassword">修改密码</a-menu-item>
              <a-menu-item class="header-dropdown__item" @click="logout">退出登录</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
  <a-drawer :open="isOpenDrawer" class="custom-class"></a-drawer>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'
  import { useRouter } from 'vue-router'

  import useLoginStore from '@/stores/login'
  import { local } from '@/utils/Storage'

  const loginStore = useLoginStore()
  const { userInfo } = toRefs(loginStore)
  const router = useRouter()
  const isCollapsible = ref<boolean>(false)
  const isFull = ref<boolean>(false)
  const isOpenDrawer = ref<boolean>(false)
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
  const updatePassword = () => {
    isOpenDrawer.value = true
  }

  /** 退出登录 */
  const logout = () => {
    local.clear()
    router.push('/login')
  }
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
