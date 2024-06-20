<template>
  <div class="layout">
    {{ userInfo }}
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'

  import useLoginStore from '@/stores/login'

  const loginStore = useLoginStore()
  const { userInfo } = toRefs(loginStore)
</script>

<style lang="scss" scoped></style>
