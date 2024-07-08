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
                <component v-if="scoped.icon" :is="scoped.icon" class="w-20 h-20 relative top-3"></component>
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
              <a-button size="small" type="text" color="blue-400" @click="onEdit(scoped)">修改</a-button>
              <a-button size="small" type="text" color="blue-400" @click="onAdd(scoped)">增加</a-button>
              <a-button size="small" type="text" color="blue-400">删除</a-button>
            </div>
          </div>
        </template>
      </a-tree>
    </div>
    <operateAccess ref="accessRef" :rulesData="rulesData" />
  </div>
</template>

<script setup lang="ts">
  import { getMenuRule, updateRuleStatus } from '@/api'

  import operateAccess from './cpns/operate-access.vue'

  const treeData = ref<any[]>([])
  const rulesData = ref<any[]>([])
  const expandedKeys = ref<string[]>([])
  const accessRef = ref<InstanceType<typeof operateAccess>>()
  const asyncGetRuledata = async () => {
    const res = await getMenuRule()
    treeData.value = res.data.list
    rulesData.value = res.data.rules
    expandedKeys.value = res.data.list.map((item: any) => item.id)
  }
  asyncGetRuledata()
  const onChange = async (e: any, scoped: any) => {
    console.log(e)
    const res = await updateRuleStatus(scoped.id, Number(e))
    scoped.status = Number(e)
  }
  // 编辑
  const onEdit = (scoped: any) => {
    accessRef.value?.showDrawer('编辑', true, scoped)
  }
  // 增加
  const onAdd = (scoped: any) => {
    accessRef.value?.showDrawer('新增', false, scoped)
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
