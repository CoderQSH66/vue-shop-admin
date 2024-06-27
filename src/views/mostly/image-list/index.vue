<template>
  <div class="image-main">
    <a-layout class="a-layout">
      <a-layout-header>
        <image-header @add="onAdd"></image-header>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="base-c" width="220">
          <image-sider @edit="onEdit" @onclick="onClick"></image-sider>
        </a-layout-sider>
        <a-layout-content class="base-c overflow-y-scroll">
          <image-content :itemId="itemId"></image-content>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <modal-cate ref="modalCateRef"></modal-cate>
  </div>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'

  import useMostlyStore from '@/stores/mostly'

  import ImageContent from '../cpns/image-content.vue'
  import ImageHeader from '../cpns/image-header.vue'
  import ImageSider from '../cpns/image-sider.vue'
  import modalCate from '../cpns/modal-cate.vue'

  const mostlyStore = useMostlyStore()
  const { imageClassItem1 } = toRefs(mostlyStore)
  const itemId = ref<number>(imageClassItem1.value.id ?? 168)

  const modalCateRef = ref<InstanceType<typeof modalCate>>()
  const onEdit = (item: any) => {
    modalCateRef.value?.showDrawer('修改分类', item)
  }
  const onAdd = () => {
    modalCateRef.value?.showDrawer('新增分类')
  }
  const onClick = (item: any) => {
    // console.log('点击了', item)
    itemId.value = item.id
  }
</script>

<style lang="scss" scoped>
  .image-main {
    @apply w-full h-full bg-white;

    .a-layout {
      @apply w-full h-full;

      .base-c {
        @apply mb-10 bg-white rounded-3xl;
      }

      .ant-layout-header {
        @apply h-80 mb-10 bg-white rounded-3xl;
      }

      .ant-layout-sider {
        overflow-y: auto;
      }

      .ant-layout-content {
        @apply mx-20;
      }
    }
  }
</style>
