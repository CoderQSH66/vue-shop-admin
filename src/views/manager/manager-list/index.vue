<template>
  <div class="manager">
    <!-- <div class="search">搜索</div> -->
    <div class="operate p-20">
      <a-button type="primary" size="large" @click="onAdd">添加管理员</a-button>
    </div>
    <div class="manager-list">
      <schema-table
        :columns="columns"
        :dataSource="manageListData.list"
        :tableOptions="tableOptions"
        :pagination="pagination"
      >
        <template #username="{ record }">
          <div class="avatar">
            <div class="img">
              <a-avatar :size="46" :src="record.avatar" />
            </div>
            <div class="info">
              <span class="font-700 text-16">{{ record.username }}</span>
              <span>{{ 'id: ' + record.id }}</span>
            </div>
          </div>
        </template>
        <template #role="{ record }">
          {{ record.role.name }}
        </template>
        <template #status="{ record }">
          <a-switch
            :checked="Boolean(record.status)"
            checked-children="开"
            un-checked-children="关"
            :loading="record.loading"
            @change="onChange($event, record)"
          ></a-switch>
        </template>
        <template #operate="{ record }">
          <div class="operate">
            <a-button class="text-cyan-500" type="text" @click="onEdit(record)">编辑</a-button>
            <a-popconfirm title="是否要删除该管理员?" ok-text="Yes" cancel-text="No" @confirm="onDelete(record)">
              <a-button type="text" danger>删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </schema-table>
    </div>
    <edit-admin ref="editAdminRef"></edit-admin>
  </div>
</template>

<script setup lang="ts">
  import { SchemaTable } from '@/components/schema-table'
  import useManagerStore from '@/stores/manager'
  import { notifyToast } from '@/utils/notificationToast'

  import { columns, tableOptions } from './config/managerList'
  import EditAdmin from './cpns/edit-admin.vue'

  import type { IPagination } from '@/components/schema-table'

  const managerStore = useManagerStore()
  const { manageListData } = toRefs(managerStore)
  const editAdminRef = ref<InstanceType<typeof EditAdmin>>()

  // 分页器
  const pagination: IPagination = {
    position: ['bottomCenter'],
    pageSizeOptions: [5, 10, 20, 30],
    showSizeChanger: true,
    defaultPageSize: 10
  }

  // 首次渲染列表数据
  managerStore.asyncGetManagerList()

  // 编辑
  const onEdit = (record: any) => {
    editAdminRef?.value?.showDrawer(true, record)
  }
  // 增加管理员
  const onAdd = () => {
    editAdminRef?.value?.showDrawer(false)
  }
  // 删除
  const onDelete = async (record: any) => {
    await managerStore.asyncDeleteManager(record.id)
    notifyToast('success', {
      message: '删除成功',
      duration: 2,
      placement: 'topRight'
    })
  }
  // 开关
  const onChange: any = async (checked: boolean, record: any) => {
    record.loading = true
    const res = await managerStore.asyncUpdateManagerStatus(String(record.id), Number(checked))
    if (res) {
      record.status = Number(checked)
      record.loading = false
      notifyToast('success', {
        message: '切换成功',
        duration: 2,
        placement: 'topRight'
      })
    } else {
      record.loading = false
    }
  }
</script>

<style lang="scss" scoped>
  .manager {
    @apply w-full bg-white;

    :deep(.ant-table-cell) {
      @apply p-10;
    }

    .manager-list {
      .avatar {
        @apply flex items-center;

        .img {
          @apply p-x-5 m-r-10;
        }

        .info {
          @apply flex-col-center;
        }
      }
    }
  }
</style>
