<template>
  <div class="header-image">
    <div class="main">
      <a-button class="btn" size="large" type="primary" @click="$emit('add')">新增分类</a-button>
      <a-button class="btn" danger size="large" type="primary" @click="uploadImg">上传图片</a-button>
    </div>
    <global-drawer title="上传图片" :closable="false" @close="isOpenDrawer = false" :open="isOpenDrawer" :width="500">
      <upload></upload>
    </global-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { GlobalDrawer } from '@/components/global-drawer'
  import { Upload } from '@/components/upload'

  const isOpenDrawer = ref<boolean>(false)
  const uploadImg = () => {
    isOpenDrawer.value = true
  }
</script>

<style lang="scss" scoped>
  .header-image {
    height: 100%;

    .main {
      @apply w-300 h-full flex items-center justify-around;
    }
  }
</style>
