<template>
  <div class="operate-access">
    <global-drawer :width="500" :title="title" :open="isOpenDrawer" @close="isOpenDrawer = false">
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
      <pre>{{ _formState }}</pre>
    </global-drawer>
  </div>
</template>

<script setup lang="ts">
  import { addMenuRules, editMenuRules } from '@/api'
  import { GlobalDrawer } from '@/components/global-drawer'
  import { SchemaForm } from '@/components/schema-form'

  import { formOptionsData, formOptionsMenu1, formOptionsMenu2, formOptions, formState } from '../config/access-update'

  interface Iprops {
    rulesData: any[]
  }
  const props = defineProps<Iprops>()
  const { rulesData } = toRefs(props)

  const _formState = ref(formState)
  const _formOptionsMenu = ref(formOptionsMenu1)
  const ep: any = inject('$epIcons')
  const _formOptionsData = computed(() => {
    formOptionsData.forEach((item) => {
      if (item.props?.options) {
        item.props.options = rulesData.value
      }
    })
    const pre = formOptionsData.slice(0, -1)
    const last = formOptionsData.slice(-1)
    _formOptionsMenu.value = _formState.value.menu === 1 ? formOptionsMenu1 : formOptionsMenu2
    _formOptionsMenu.value.forEach((item) => {
      if (item.type === 'select' && item.options) {
        item.options = Object.entries(ep).map((item: any) => {
          return {
            label: item[1].__name,
            value: item[1].__name
          }
        })
      }
    })
    return [...pre, ..._formOptionsMenu.value, ...last]
  })

  const isOpenDrawer = ref<boolean>(false)
  const title = ref<string>('')
  const isEdit = ref<boolean>(false)
  const id = ref<number>(-1)
  const schemaFormRef = ref<InstanceType<typeof SchemaForm>>()
  const showDrawer = (_title: string, _isEidt: boolean, scoped: any) => {
    isEdit.value = _isEidt
    id.value = scoped.id
    if (isEdit.value) {
      // eslint-disable-next-line guard-for-in
      for (const key in _formState.value) {
        _formState.value[key] = scoped[key]
      }
      _formState.value.status = 1
      console.log(_formState.value)
    } else {
      schemaFormRef.value?.formRef?.resetFields()
    }
    // _formState.value.rule_id = getIds(rulesData.value, scoped.id)
    // console.log(_formState.value.rule_id)
    isOpenDrawer.value = true
    title.value = _title
  }
  // const getIds = (rulesData: any[], scopedId: number) => {
  //   const ids: any[] = []

  //   rulesData.forEach((item: any) => {
  //     if (item.id !== scopedId) {
  //       getIds(item.child, scopedId)
  //     }
  //     if (item.id === scopedId) {
  //       ids.push(scopedId)
  //       return ids
  //     }
  //   })
  //   return ids
  // }
  const onConfirm = async () => {
    try {
      await schemaFormRef.value?.formRef?.validate()
      for (const key in _formState.value) {
        if (key === 'rule_id') {
          _formState.value[key] = _formState.value[key]?.pop()
        }
      }
      try {
        isEdit.value ? await editMenuRules(id.value, _formState.value) : await addMenuRules(_formState.value)
        isOpenDrawer.value = false
      } catch (error) {
        isOpenDrawer.value = false
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onCancel = () => {
    console.log(2)
  }
  defineExpose({ showDrawer })
</script>

<style lang="scss" scoped>
  :global(.ant-cascader-menus) {
    width: 100% !important;
  }
</style>
