<template>
  <div class="schema-form">
    <a-form ref="formRef" :model="formState" :label-col="{ span: formOptions.labelSpan }" v-bind="formOptions.props">
      <a-row :gutter="formOptions.gutterSpan">
        <template v-for="item of formOptionsData" :key="item.name">
          <a-col :span="formOptions.colSpan">
            <a-form-item :label="item.label" :name="item.name" :required="item.required">
              <!-- 输入框 -->
              <template v-if="item.type === 'input'">
                <a-input v-model:value="formState[item.name]" v-bind="item.props">
                  <template v-if="item.icon" #prefix>
                    <i :class="`${item.icon} w-20 h-20`"></i>
                  </template>
                </a-input>
              </template>
              <template v-else-if="item.type === 'input-number'">
                <a-input-number v-model:value="formState[item.name]" v-bind="item.props"></a-input-number>
              </template>
              <template v-else-if="item.type === 'textarea'">
                <a-textarea v-model:value="formState[item.name]" v-bind="item.props"></a-textarea>
              </template>
              <template v-else-if="item.type === 'password'">
                <a-input-password v-model:value="formState[item.name]" v-bind="item.props"></a-input-password>
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
              <!-- value-format格式化提交时间 -->
              <template v-if="item.type === 'date-range'">
                <a-range-picker v-model:value="formState[item.name]" v-bind="item.props" />
              </template>
              <template v-if="item.type === 'date'">
                <a-date-picker v-model:value="formState[item.name]" v-bind="item.props" />
              </template>
              <!-- switch开关 -->
              <template v-if="item.type === 'switch'">
                <a-switch v-model:checked="formState[item.name]" v-bind="item.props" />
              </template>
              <!-- 图片上传 -->
              <template v-if="item.type === 'image-upload'">
                <SelectImg></SelectImg>
              </template>
            </a-form-item>
          </a-col>
        </template>
        <template v-if="formOptions.operate">
          <slot name="operate" :formState="formState"></slot>
        </template>
        <template v-else>
          <div class="operate w-full flex justify-around">
            <a-button type="primary" size="large" @click="$emit('confirm')">确定</a-button>
            <a-button type="primary" size="large" @click="$emit('cancel')" danger>取消</a-button>
          </div>
        </template>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { toRefs, ref } from 'vue'

  import SelectImg from '@/views/manager/manager-list/cpns/select-img.vue'

  import type { IFormPropsType } from './types'
  import type { FormInstance } from 'ant-design-vue'

  const props = defineProps<IFormPropsType>()
  const { formOptions, formOptionsData, formState } = toRefs(props)
  // console.log(formOptions, formOptionsData, formState)
  const formRef = ref<FormInstance>()

  defineExpose({
    formRef
  })
</script>

<style lang="scss" scoped>
  .ant-picker {
    width: 100% !important;
  }
</style>
