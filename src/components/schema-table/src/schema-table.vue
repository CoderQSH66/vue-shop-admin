<template>
  <div class="schema-table">
    <a-table :columns="columns" :data-source="dataSource" v-bind="tableOptions" :pagination="pagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operate'">
          <slot name="operation" :record="record"></slot>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'

  import type { IPropTableOptions } from './types'

  const props = defineProps<IPropTableOptions>()
  const { columns, dataSource, tableOptions, pagination } = toRefs(props)
</script>

<style lang="scss" scoped>
  .schema-table {
    @apply w-full h-full;

    :deep(.ant-pagination) {
      @apply w-full p-t-15;
    }

    :deep(.ant-select-selector) {
      @apply w-100 text-center;
    }
  }
</style>
