<template>
  <Teleport to="body">
    <div class="global-drawer">
      <a-drawer
        :open="isOpenDrawer"
        title="修改密码"
        class="drawer-custom-class"
        placement="right"
        @close="isOpenDrawer = false"
      >
      </a-drawer>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'

  const formState = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })
  const isOpenDrawer = ref<boolean>(false)

  const updatePassword = async () => {
    // try {
    //   await loginStore.asyncFetchChangePassword(formState)
    // } catch (err) {
    //   isOpenDrawer.value = false
    // }
  }
</script>

<style lang="scss" scoped></style>
