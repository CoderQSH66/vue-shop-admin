<template>
  <Teleport to="body">
    <div class="edit-admin">
      <global-drawer
        :title="isEdit ? '修改管理员' : '新增管理员'"
        :width="550"
        :open="isOpenDrawer"
        @close="isOpenDrawer = false"
        :closable="false"
      >
        <schema-form
          ref="schemaFormRef"
          :formOptionsData="_formOptionsData"
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
  import useManagerStore from '@/stores/manager'

  import { formOptionsData, formOptions, formState } from '../config/editAdmin'

  const schemaFormRef = ref<InstanceType<typeof SchemaForm>>()
  const managerStore = useManagerStore()
  const { roleList, totalCount } = toRefs(managerStore)
  const page = ref<number>(1)
  managerStore.asyncGetRoleList(page.value)

  watch(totalCount, () => {
    if (totalCount.value > roleList.value.length) {
      page.value += 1
      managerStore.asyncGetRoleList(page.value)
    }
  })
  const _formOptionsData = computed(() => {
    formOptionsData.forEach((item) => {
      if (item.options) {
        item.options = roleList.value?.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }
    })
    return formOptionsData
  })
  const _formState = ref(formState)
  const isOpenDrawer = ref<boolean>(false)
  const isEdit = ref<boolean>(false)
  const itemId = ref<number>(0)
  const onConfirm = async () => {
    try {
      await schemaFormRef.value?.formRef?.validate()

      const prams: any = {}
      Object.entries(_formState.value).forEach(([key, value]) => {
        prams[key] = key === 'status' ? Number(value) : value
      })
      isEdit.value
        ? await managerStore.asyncUpdateManager(itemId.value, prams)
        : await managerStore.asyncAddManager(prams)
      isOpenDrawer.value = false
    } catch (error) {
      console.log(error)
    }
  }
  const onCancel = () => {
    isOpenDrawer.value = false
  }
  const showDrawer = (_isEdit: boolean, record?: any) => {
    isEdit.value = _isEdit
    itemId.value = record?.id
    if (_isEdit) {
      Object.entries(_formState.value).forEach(([key]) => {
        _formState.value[key] = key === 'status' ? Boolean(record[key]) : record[key]
      })
    } else {
      console.log(_formState.value)
      Object.entries(_formState.value).forEach(([key]) => {
        _formState.value[key] = key === 'status' ? false : ''
      })
    }

    isOpenDrawer.value = true
  }

  defineExpose({ showDrawer })
</script>

<style lang="less" scoped></style>
