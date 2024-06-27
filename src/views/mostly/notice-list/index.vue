<template>
  <div class="notice">
    <global-card>
      <template #title>
        <div class="add p-20">
          <a-button type="primary" danger>新增公告</a-button>
        </div>
      </template>
      <template #extra>
        <a-tooltip>
          <template #title>刷新内容</template>
          <i class="i-ant:sync-outlined block w-25 h-25"></i>
        </a-tooltip>
      </template>
      <div class="table">
        <!-- <schema-table></schema-table> -->
      </div>
    </global-card>
  </div>
</template>

<script setup lang="ts">
  import { GlobalCard } from '@/components/global-card'
  import { SchemaTable } from '@/components/schema-table'
</script>

<style lang="scss" scoped>
  .notice {
    @apply w-full h-full;

    .table {
      @apply w-full h-full;
    }
  }
</style>
