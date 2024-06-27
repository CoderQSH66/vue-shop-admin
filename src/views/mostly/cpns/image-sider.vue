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

  import { showModal } from '@/components/command-modal'
  import { EditSide } from '@/components/edit-side'
  import useMostlyStore from '@/stores/mostly'

  const mostlyStore = useMostlyStore()
  const { imageClassList, imageClassTotal, imageClassItem1 } = toRefs(mostlyStore)
  const total = computed(() => {
    return imageClassTotal.value
  })
  const itemId = ref<number>(imageClassItem1.value.id ?? 168)
  const isEdit = ref<boolean>(false)
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
    itemId.value = imageClassItem1.value.id as number
  })

  const emits = defineEmits(['edit', 'remove', 'onclick'])

  const onEdit = (item: any) => {
    isEdit.value = true
    // console.log(item)
    emits('edit', item)
  }

  const onClick = (item: any) => {
    itemId.value = item.id
    // console.log('````', itemId.value)
    emits('onclick', item)
    mostlyStore.asyncGetImageList(itemId.value, 1)
  }
  const onRemove = () => {
    // console.log('删除', itemId.value)
    const unmount = showModal({
      open: true,
      title: '确认删除该分类吗？',
      cancelText: '取消',
      okText: '确认',
      closable: true,
      onOk() {
        // console.log('ok')
        mostlyStore.asyncDeleteImageCate(itemId.value)
        mostlyStore.asyncGetMostlyImageList(pagination.current, pagination.pageSize)

        unmount()
      },
      onCancel() {
        // console.log('cancel')
        unmount()
      }
    })
  }
</script>

<style lang="scss" scoped></style>
