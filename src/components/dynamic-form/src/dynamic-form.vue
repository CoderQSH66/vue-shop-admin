<template>
  <div class="dynamic-form">
    <a-form :model="formState" :label-col="{ span: formLayout.labelSpan }" v-bind="formProps">
      <a-row :gutter="formLayout.gutterSpan">
        <template v-for="(item, index) of formItems" :key="index">
          <a-col :span="formLayout.colSpan">
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
  import { type IFormPropsType, componentsMap } from './types'

  const props = withDefaults(defineProps<IFormPropsType>(), {
    formProps: () => ({
      layout: 'horizontal',
      size: 'large'
    }),
    formLayout: () => ({
      labelSpan: 6,
      colSpan: 24,
      gutterSpan: [24, 12]
    })
  })
  const { formState, formItems } = toRefs(props)
</script>

<style lang="scss" scoped>
  .ant-picker {
    width: 100% !important;
  }
</style>
