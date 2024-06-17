<template>
  <div class="app">
    <a-button @click="onT">弹窗</a-button>
  </div>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'

import instance from '@/api/request'

instance
  .request({
    url: '/fapig/douyin/billboard',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      key: '0943c4c322b4627b7e7c664f769e93a8',
      type: 'hot_video'
    }
  })
  .then((res) => {
    console.log(res)
  })
const onT = () => {
  message.error('弹窗成功')
}
</script>

<style lang="less" scoped></style>
