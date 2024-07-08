<template>
  <div class="app">
    <DynamicForm
      :formState="formState"
      :formItems="formItems"
      :formLayout="{
        labelSpan: 6,
        colSpan: 12,
        gutterSpan: [0, 24]
      }"
      :formProps="{
        layout: 'vertical'
      }"
    >
      <template #address="scoped">
        <a-cascader v-bind="scoped" v-model:value="formState[scoped.name]" :options="scoped.options"></a-cascader>
      </template>
    </DynamicForm>
    <pre>{{ formState }}</pre>
  </div>
</template>

<script setup lang="ts">
  import { DynamicForm, type IFormItem } from '@/components/dynamic-form'

  const formState = reactive({
    username: '',
    password: '',
    sex: 1,
    date1: '',
    date2: [],
    address: []
  })
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake'
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men'
            }
          ]
        }
      ]
    }
  ]
  const formItems = reactive<IFormItem[]>([
    {
      name: 'username',
      type: 'Input',
      label: '用户名',
      placeholder: '请输入用户名',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    },
    {
      name: 'password',
      label: '密码',
      placeholder: '请输入密码',
      type: 'Input'
    },
    {
      name: 'sex',
      label: '性别',
      placeholder: '请选择性别',
      type: 'Select',
      typeOfChild: 'SelectOption',
      options: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 0
        }
      ]
    },
    {
      name: 'date1',
      label: '生日',
      placeholder: '请选择生日',
      type: 'DatePicker',
      valueFormat: 'YYYY-MM-DD'
    },
    {
      name: 'date2',
      label: '生日',
      placeholder: ['请选择生日', 'aaa'],
      type: 'RangePicker',
      valueFormat: 'YYYY-MM-DD'
    },
    {
      name: 'address',
      label: '地址',
      type: 'custom',
      slotName: 'address',
      options,
      multiple: true
    }
  ])
  watch(
    formState,
    () => {
      console.log(formState)
    },
    { immediate: true, deep: true }
  )
</script>

<style lang="less" scoped></style>
