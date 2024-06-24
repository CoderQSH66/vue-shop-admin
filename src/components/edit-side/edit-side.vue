<template>
  <div class="edit-side">
    <a-spin :spinning="isSpinning">
      <a-list :data-source="data" item-layout="horizontal" :pagination="pagination">
        <template #renderItem="{ item }">
          <div class="main-content" @click="onClickClass(item)">
            <edit-card
              :active="item.id === itemId"
              :title="item.name"
              @edit="onEditImage"
              @remove="onRemoveImage"
            ></edit-card>
          </div>
        </template>
      </a-list>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'

  import useMostlyStore from '@/stores/mostly'

  import { EditCard } from '../edit-card'

  const { isSpinning } = toRefs(useMostlyStore())
  interface IPropsType {
    data: any[]
    pagination?: any
    itemId: number | string
  }
  const props = withDefaults(defineProps<IPropsType>(), {
    data: () => ['分类一', '分类二', '分类三'],
    pagination: false
  })
  const emits = defineEmits(['edit', 'remove', 'onclick'])

  const onEditImage = () => {
    emits('edit')
  }
  const onRemoveImage = () => {
    emits('remove')
  }
  const onClickClass = (item: any) => {
    emits('onclick', item)
  }
</script>

<style lang="scss" scoped></style>
