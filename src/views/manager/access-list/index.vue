<template>
  <div class="access-list">
    <div class="tree-list">
      <a-tree
        :tree-data="treeData"
        :field-names="{ title: 'name', key: 'id', children: 'child' }"
        v-model:expandedKeys="expandedKeys"
        checkable
        blockNode
      >
        <template #title="scoped">
          <div class="custom-title">
            <div class="left">
              <a-tag v-if="scoped.menu" color="blue">菜单</a-tag>
              <a-tag v-else>权限</a-tag>
              <span>
                <component :is="scoped.icon" class="w-20 h-20 relative top-3"></component>
                {{ scoped.name }}
              </span>
            </div>
            <div class="right">
              <a-switch
                @change="onChange($event, scoped)"
                checked-children="开"
                un-checked-children="关"
                :checked="Boolean(scoped.status)"
              ></a-switch>
              <a-button size="small" type="text" color="blue-400" @click="onEdit">修改</a-button>
              <a-button size="small" type="text" color="blue-400" @click="onAdd">增加</a-button>
              <a-button size="small" type="text" color="blue-400">删除</a-button>
            </div>
          </div>
        </template>
      </a-tree>
    </div>
    <operateAccess ref="accessRef" />
  </div>
</template>

<script setup lang="ts">
  import { getMenuRule, updateRuleStatus } from '@/api'

  import operateAccess from './cpns/operate-access.vue'

  const treeData = ref<any[]>([])
  const expandedKeys = ref<string[]>([])
  const accessRef = ref<InstanceType<typeof operateAccess>>()
  const asyncGetRuledata = async () => {
    const res = await getMenuRule()
    treeData.value = res.data.list
  }
  asyncGetRuledata()
  const onChange = async (e: any, scoped: any) => {
    console.log(e)
    const res = await updateRuleStatus(scoped.id, Number(e))
    scoped.status = Number(e)
  }
  // 编辑
  const onEdit = () => {
    accessRef.value?.showDrawer('编辑')
  }
  // 增加
  const onAdd = () => {
    accessRef.value?.showDrawer('新增')
  }
</script>

<style lang="scss" scoped>
  .access-list {
    @apply min-h-full bg-white;

    .tree-list {
      :deep(.ant-tree-treenode) {
        @apply p-10;
      }

      .custom-title {
        @apply flex justify-between;

        :deep(.ant-btn) {
          @apply hover:(color-blue);
        }
      }
    }
  }
</style>
