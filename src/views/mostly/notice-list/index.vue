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
        <schema-table :columns="columns" :dataSource="dataSource">
          <template #operation="{ record }">
            <a-button type="text" @click="onEdit(record)">编辑</a-button>
            <a-button type="text" danger>删除</a-button>
          </template>
        </schema-table>
      </div>
    </global-card>
  </div>
</template>

<script setup lang="ts">
  import { GlobalCard } from '@/components/global-card'
  import { SchemaTable } from '@/components/schema-table'

  import { columns } from '../config/noticeSchema'

  const dataSource = [
    {
      name: '公告1',
      time: '2022-12-12 12:12:12'
    },
    {
      name: '公告2',
      time: '2022-12-12 12:12:12'
    },
    {
      name: '公告3',
      time: '2022-12-12 12:12:12'
    }
  ]
  const onEdit = (item: any) => {
    console.log(item)
  }
</script>

<style lang="scss" scoped>
  .notice {
    @apply w-full h-full;

    .table {
      @apply w-full h-full;
    }
  }
</style>
