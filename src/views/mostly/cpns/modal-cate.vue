<template>
  <div class="app">
    <global-drawer :open="isOpenDrawer" @close="isOpenDrawer = false" :title="title">
      <schema-form
        :formOptionsData="formOptionsData"
        :formOptions="formOptions"
        :formState="formState"
        @confirm="updateCate"
        @cancel="isOpenDrawer = false"
      ></schema-form>
    </global-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'

  import { GlobalDrawer } from '@/components/global-drawer'
  import { SchemaForm } from '@/components/schema-form'
  import useMostlyStore from '@/stores/mostly'

  import { formOptions, formOptionsData } from '../config/updateCate'

  const mostlyStore = useMostlyStore()
  const isOpenDrawer = ref<boolean>(false)
  const title = ref<string>('默认标题')
  const Item = ref<any>({})
  const isUpdate = ref<boolean>(false)
  const formState = reactive({
    name: '',
    order: 50
  })
  /** 打开drawer */
  const showDrawer = (_title: string, item?: any) => {
    title.value = _title
    formState.name = ''
    formState.order = 50
    if (item) {
      isUpdate.value = true
      Item.value = item
      formState.name = item.name
      formState.order = item.order
    }
    isOpenDrawer.value = true
  }

  /** 更新分类 */
  const updateCate = async () => {
    // console.log(isUpdate.value)
    isUpdate.value
      ? await mostlyStore.asyncUpdateImageCate(Item.value.id, formState)
      : await mostlyStore.asyncAddImageCate(formState)
    isOpenDrawer.value = false
    mostlyStore.asyncGetMostlyImageList(1)
  }

  defineExpose({ showDrawer })
</script>

<style lang="less" scoped></style>
