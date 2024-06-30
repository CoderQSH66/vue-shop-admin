<template>
  <div class="notice">
    <global-card>
      <template #title>
        <div class="add p-20">
          <a-button type="primary" danger @click="onAdd">新增公告</a-button>
        </div>
      </template>
      <template #extra>
        <a-tooltip>
          <template #title>刷新内容</template>
          <i class="i-ant:sync-outlined block w-25 h-25"></i>
        </a-tooltip>
      </template>
      <div class="table">
        <schema-table
          :columns="columns"
          :dataSource="noticeListState.list"
          :tableOptions="tableOptions"
          :pagination="pagination"
        >
          <template #operate="{ record }">
            <a-button type="text" @click="onEdit(record)">编辑</a-button>
            <a-popconfirm title="是否要删除该公告?" ok-text="Yes" cancel-text="No" @confirm="onDelete(record)">
              <a-button type="text" danger>删除</a-button>
            </a-popconfirm>
          </template>
        </schema-table>
      </div>
    </global-card>
    <notice-update ref="noticeUpdateRef"></notice-update>
  </div>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'

  import { GlobalCard } from '@/components/global-card'
  import { SchemaTable } from '@/components/schema-table'
  import useNoticeSore from '@/stores/notice'

  import { columns, tableOptions } from '../config/noticeSchema'
  import NoticeUpdate from '../cpns/notice-update.vue'

  import type { IPagination } from '@/components/schema-table'

  const noticeUpdateRef = ref<InstanceType<typeof NoticeUpdate>>()
  const noticeSore = useNoticeSore()
  const { noticeListState } = toRefs(noticeSore)

  // 首次渲染数据
  noticeSore.asyncGetNoticeList(2)

  // 一次性分页器
  const pagination: IPagination = {
    position: ['bottomCenter'],
    pageSizeOptions: [5, 10, 20, 30],
    showSizeChanger: true,
    defaultPageSize: 5,
    showTotal: (total: number) => `共 ${total} 条`,
    onChange: (page: number, pageSize: number) => {
      console.log(page, pageSize)
    }
  }

  // 新增
  const onAdd = () => {
    noticeUpdateRef.value?.showDrawer('新增公告', true)
  }
  // 编辑和删除
  const onEdit = (item: any) => {
    noticeUpdateRef.value?.showDrawer('修改公告', false, item)
  }
  const onDelete = (item: any) => {
    noticeSore.asyncDeleteNotice(item.id)
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
