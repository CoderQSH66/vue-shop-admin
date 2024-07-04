<template>
  <div class="dynamic-form">
    <a-form :model="formState" :label-col="{ span: 6 }">
      <a-row>
        <template v-for="(item, index) of formItems" :key="index">
          <a-col :span="8">
            <a-form-item :name="item.name" :label="item.label" :rules="item.rules">
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName" v-bind="item"></slot>
              </template>
              <component v-else v-bind="item" :is="componentsMap[item.type]" v-model:value="formState[item.name]">
                <template v-if="item.typeOfChild && item.options">
                  <component
                    v-for="itemChild of item.options"
                    :key="itemChild.value"
                    :is="componentsMap[item.typeOfChild]"
                    v-bind="itemChild"
                  >
                  </component>
                </template>
              </component>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { Input, Select, SelectOption, DatePicker, RangePicker, Cascader } from 'ant-design-vue'

  import type { FormProps } from 'ant-design-vue'

  export interface IpropsType {
    formState: any
    formItems: any[]
  }
  const componentsMap: {
    [key: string]: any
  } = {
    Input,
    Select,
    SelectOption,
    DatePicker,
    RangePicker,
    Cascader
  }
  const props = defineProps<IpropsType>()
  const { formState, formItems } = toRefs(props)
</script>

<style lang="scss" scoped>
  .ant-picker {
    width: 100% !important;
  }
</style>
