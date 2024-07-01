<template>
  <Teleport to="body">
    <div class="edit-admin">
      <global-drawer :width="550" :open="isOpenDrawer" @close="isOpenDrawer = false">
        <schema-form
          ref="schemaFormRef"
          :formOptionsData="formOptionsData"
          :formOptions="formOptions"
          :formState="_formState"
        ></schema-form>
        <template #footer>
          <div class="operate w-full flex p-b-20">
            <a-button class="m-r-30" type="primary" size="large" @click="onConfirm">确定</a-button>
            <a-button type="primary" size="large" @click="onCancel" danger>取消</a-button>
          </div>
        </template>
      </global-drawer>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { GlobalDrawer } from '@/components/global-drawer'
  import { SchemaForm } from '@/components/schema-form'

  import { formOptionsData, formOptions, formState } from '../config/editAdmin'

  const _formState = ref(formState)
  const isOpenDrawer = ref<boolean>(false)

  const onConfirm = () => {
    console.log(_formState.value)
  }
  const onCancel = () => {
    isOpenDrawer.value = false
  }
  const showDrawer = () => {
    isOpenDrawer.value = true
  }

  defineExpose({ showDrawer })
</script>

<style lang="less" scoped></style>
