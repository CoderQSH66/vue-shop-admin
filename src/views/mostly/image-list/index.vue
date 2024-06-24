<template>
  <div class="image-main">
    <a-layout class="a-layout">
      <a-layout-header>Header</a-layout-header>
      <a-layout>
        <a-layout-sider class="base-c" width="220">
          <image-sider></image-sider>
        </a-layout-sider>
        <a-layout-content class="base-c overflow-y-scroll">
          <h2 v-for="i in 20" :key="i" class="w-100 h-100">{{ i }}</h2>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
  import ImageSider from '../cpns/image-sider.vue'
</script>

<style lang="scss" scoped>
  .image-main {
    @apply w-full h-full bg-white;

    .a-layout {
      @apply w-full h-full;

      .base-c {
        @apply mb-10 bg-white rounded-3xl;
      }

      .ant-layout-header {
        @apply h-80 mb-10 bg-white rounded-3xl;
      }

      .ant-layout-sider {
        overflow-y: auto;
      }

      .ant-layout-content {
        @apply mx-20;
      }
    }
  }
</style>
