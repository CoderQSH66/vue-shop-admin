<template>
  <div class="layout">
    <div class="mo bg-red-500 hover:(w-100 h-100)" i-ant:alipay-circle-filled />
    <div class="mo bg-red-500 hover:(w-100 h-100)" i-ant:customer-service-filled />
    <div i-ad:step-backward-outlined />
    <div :class="'i-ant:' + iconList[i % 2]" w-50 h-50 color-violet></div>
    <button @click="onToggle">toggle</button>
    <a href="">哈哈哈</a>
    <button>按钮</button>
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const iconList = ['customer-service-filled', 'alipay-circle-filled']
  const i = ref(0)
  const onToggle = () => {
    i.value += 1
  }
</script>

<style lang="scss" scoped></style>
