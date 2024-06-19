<template>
  <div class="not-found">
    <div class="main">
      <div class="title">404错误！</div>
      <div class="info">找不到页面~{{ route.params.pathMatch }}</div>
      <a-button type="primary" danger @click="$router.push('/')">返回首页</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>

<style lang="scss" scoped>
  .not-found {
    @apply flex-center;

    height: 100vh;
    background-color: var(--primary-color);

    .main {
      @apply w-300 h-300 bg-cyan-500;

      .title {
        @apply font-700 text-40 color-white p-y-20 text-center;
      }

      .info {
        @apply font-500 text-20 color-bluegray-200 p-y-20 text-center;
      }

      .ant-btn {
        @apply w-200 block;

        margin: 20px auto;
      }
    }
  }
</style>
