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
      method: 'post',
      url: '/laohuangli/d',
      data: {
        key: 'e9506cb1c4afabfc1724a2580b33716b',
        date: '2024-06-17'
      },
      requestType: 'urlencoded'
    })
    .then((res) => {
      console.log(res)
    })
  const onT = () => {
    message.error('弹窗成功')
  }
</script>

<style lang="less" scoped></style>
