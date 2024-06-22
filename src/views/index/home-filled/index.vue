<template>
  <div class="home-filled">
    <a-row :gutter="24">
      <a-col :span="6" v-for="i in 5" :key="i">
        <a-skeleton active loading>
          <div class="card">
            <h1>HomeFilled</h1>
            <h2>欢迎使用</h2>
            <a-button type="primary" danger @click="$router.push('/')">返回首页</a-button>
          </div>
        </a-skeleton>
      </a-col>
    </a-row>
    <button></button>
  </div>
</template>

<script setup lang="ts">
  import useHomeStore from '@/stores/home'

  const homeStore = useHomeStore()
  homeStore.asyncGetHomeData('week')
</script>

<style lang="scss" scoped>
  .home-filled {
    @apply w-full h-full bg-white-500;
  }
</style>
