<template>
  <div class="app">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
  import { throttle } from 'underscore'

  const resize = throttle(() => {}, 500)
  window.addEventListener('resize', resize)
</script>

<style lang="scss" scoped></style>
