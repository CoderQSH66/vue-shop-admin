<template>
  <div class="image-sider">
    <edit-side
      :itemId="itemId"
      :pagination="pagination"
      :data="imageClassList"
      @edit="onEdit"
      @remove="onRemove"
      @onclick="onClick"
    ></edit-side>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, toRefs, watchEffect, ref } from 'vue'

  import { EditSide } from '@/components/edit-side'
  import useMostlyStore from '@/stores/mostly'

  const mostlyStore = useMostlyStore()
  const { imageClassList, imageClassTotal } = toRefs(mostlyStore)
  const total = computed(() => {
    return imageClassTotal.value
  })
  const itemId = ref<number>(168)
  const pagination = reactive({
    pageSize: 10, // 默认每页显示数量,
    current: 1, // 默认当前显示第几页
    pageSizeOptions: ['5', '10', '20'],
    showSizeChanger: true,
    total,
    onChange: (page: number, pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.current = page
    }
  })

  /** 侦听页码的变化，获取数据 */
  watchEffect(async () => {
    await mostlyStore.asyncGetMostlyImageList(pagination.current, pagination.pageSize)
  })

  const onEdit = () => {
    console.log('编辑', itemId.value)
  }
  const onRemove = () => {
    console.log('删除', itemId.value)
  }
  const onClick = (item: any) => {
    itemId.value = item.id
  }
</script>

<style lang="scss" scoped></style>
