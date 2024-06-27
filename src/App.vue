<template>
  <a-config-provider :getPopupContainer="getPopupContainer" :locale="zhCN">
    <div class="app">
      <RouterView></RouterView></div
  ></a-config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { throttle } from 'underscore'
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'

  import useHomeStore from './stores/home'

  const homeStore = useHomeStore()
  const route = useRoute()
  const resize = throttle(() => {}, 500)
  window.addEventListener('resize', resize)
  watch(
    () => route.path,
    () => {
      if (route.path === '/login') return
      homeStore.addTags({
        name: route.meta.title as string,
        path: route.path
      })
    }
  )
  /**
   *  国际化
   */
  const getPopupContainer: any = (el: any, dialogContext: any) => {
    if (dialogContext) {
      return dialogContext.getDialogWrap()
    }
    return document.body
  }
</script>

<style lang="scss" scoped></style>
