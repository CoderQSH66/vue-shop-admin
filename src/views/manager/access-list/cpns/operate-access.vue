<template>
  <div class="operate-access">
    <global-drawer :width="500" :title="title" :open="isOpenDrawer" @close="isOpenDrawer = false">
      <schema-form :formOptionsData="formOptionsData" :formOptions="formOptions" :formState="formState"></schema-form>
      <template #footer>
        <div class="operate w-full flex p-b-20">
          <!-- <a-button class="m-r-30" type="primary" size="large" @click="onConfirm">确定</a-button>
          <a-button type="primary" size="large" @click="onCancel" danger>取消</a-button> -->
        </div>
      </template>
    </global-drawer>
  </div>
</template>

<script setup lang="ts">
  import { GlobalDrawer } from '@/components/global-drawer'
  import { SchemaForm } from '@/components/schema-form'

  import { formOptionsData, formOptions, formState } from '../config/access-update'

  console.log(formState)
  const isOpenDrawer = ref<boolean>(true)
  const title = ref<string>('')

  const showDrawer = (_title: string) => {
    isOpenDrawer.value = true
    title.value = _title
  }

  defineExpose({ showDrawer })
</script>

<style lang="scss" scoped></style>
