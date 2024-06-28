<template>
  <div class="notice-update">
    <global-drawer :width="500" :open="isOpenDrawer" :title="title" @close="isOpenDrawer = false" :closable="false">
      <schema-form
        ref="schemaFormRef"
        :formOptionsData="formOptionsData"
        :formOptions="formOptions"
        :formState="formState"
        @confirm="onConfirm"
        @cancel="isOpenDrawer = false"
      ></schema-form>
    </global-drawer>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'

  import { GlobalDrawer } from '@/components/global-drawer'
  import { SchemaForm } from '@/components/schema-form'
  import useNoticeSore from '@/stores/notice'

  import { formOptions, formOptionsData } from '../config/noticeForm'

  const noticeSore = useNoticeSore()
  noticeSore.asyncGetNoticeList()
  const _formState: any = {}
  formOptionsData.forEach((item) => {
    _formState[item.name] = ''
  })
  const formState = reactive(_formState)
  const isOpenDrawer = ref<boolean>(false)
  const title = ref<string>('')
  const isAdd = ref<boolean>(false)
  const id = ref<number>(0)
  const schemaFormRef = ref<InstanceType<typeof SchemaForm>>()
  const showDrawer = (_title: string, _isAdd?: boolean, _item?: any) => {
    title.value = _title
    isAdd.value = !!_isAdd
    if (_isAdd) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(formState)) {
        formState[key] = ''
      }
    } else {
      id.value = _item.id
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(formState)) {
        formState[key] = _item[key]
      }
    }
    isOpenDrawer.value = true
  }
  const onConfirm = async () => {
    try {
      await schemaFormRef.value?.formRef?.validate()
      isAdd.value ? await noticeSore.asyncAddNotice(formState) : await noticeSore.asyncUpdateNotice(id.value, formState)
      isOpenDrawer.value = false
    } catch (error) {
      console.log(error)
    }
  }
  defineExpose({ showDrawer })
</script>

<style lang="scss" scoped></style>
