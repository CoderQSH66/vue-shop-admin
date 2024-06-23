<template>
  <div class="app">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped></style>
