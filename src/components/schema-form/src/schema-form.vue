<template>
  <div class="schema-form">
    <a-form :model="formState" :label-col="{ span: formData.span }">
      <a-row :gutter="formData.gutter">
        <template v-for="item of formOptionsData" :key="item.name">
          <a-col :span="formData.span">
            <a-form-item :label="item.label" :name="item.name" :required="item.required">
              <!-- 输入框 -->
              <template v-if="item.type === 'input'">
                <a-input v-model:value="formState[item.name]" v-bind="item.props"></a-input>
              </template>
              <!-- 下拉框 -->
              <template v-if="item.type === 'select'">
                <a-select v-model:value="formState[item.name]" v-bind="item.props">
                  <template v-for="option of item.options" :key="option.value">
                    <a-select-option :value="option.value">{{ option.label }}</a-select-option>
                  </template>
                </a-select>
              </template>
              <!-- 多选框 -->
              <template v-if="item.type === 'checkbox'">
                <a-checkbox-group v-model:value="formState[item.name]">
                  <template v-for="option of item.options" :key="option.value">
                    <a-checkbox :value="option.value">{{ option.label }}</a-checkbox>
                  </template>
                </a-checkbox-group>
              </template>
              <!-- 时间选择器 -->
              <template v-if="item.type === 'date-range'">
                <a-range-picker v-model:value="formState[item.name]" v-bind="item.props" />
              </template>
              <template v-if="item.type === 'date'">
                <a-date-picker v-model:value="formState[item.name]" v-bind="item.props" />
              </template>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watch } from 'vue'

  const formState: any = reactive({
    username: '',
    password: '',
    department: '',
    hobby: [],
    dateTime: '',
    dateTimeRange: []
  })
  watch(
    formState,
    () => {
      console.log(formState)
    },
    { deep: true }
  )
  const formData = {
    span: 8,
    gutter: [24, 24]
  }
  const formOptionsData = [
    {
      type: 'input',
      label: '用户名',
      name: 'username',
      required: true,
      props: {
        placeholder: '请输入用户名'
      }
    },
    {
      type: 'input',
      label: '密码',
      name: 'password',
      required: true,
      props: {
        placeholder: '请输入密码'
      }
    },
    {
      type: 'select',
      label: '部门',
      name: 'department',
      required: true,
      props: {
        placeholder: '请选择部门'
      },
      options: [
        {
          label: '部门1',
          value: 1
        },
        {
          label: '部门2',
          value: 2
        }
      ]
    },
    {
      type: 'checkbox',
      label: '爱好',
      name: 'hobby',
      required: true,
      options: [
        {
          label: '篮球',
          value: 1
        },
        {
          label: 'rap',
          value: 2
        },

        {
          label: '唱跳',
          value: 3
        }
      ]
    },
    {
      type: 'date-range',
      label: '选择日期范围',
      name: 'dateTimeRange',
      required: true,
      props: {
        placeholder: ['请选择日期', '请选择日期'],
        picker: '',
        'show-time': true
      }
    },
    {
      type: 'date',
      label: '选择日期',
      name: 'dateTime',
      required: true,
      props: {
        placeholder: ['请选择日期'],
        picker: 'year'
      }
    }
  ]
</script>

<style lang="scss" scoped>
  .ant-picker {
    width: 100% !important;
  }
</style>
