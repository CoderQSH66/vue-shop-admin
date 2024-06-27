<template>
  <a-spin :spinning="isMainSpinning">
    <div class="image-content">
      <a-image-preview-group>
        <a-row :gutter="[24, 24]">
          <template v-for="image of imageList.list" :key="image.id">
            <a-col :span="6">
              <global-card hoverable>
                <template #cover>
                  <a-image :src="image.url" height="150px" fallback="../../../assets/img/error.jpg">
                    <template #placeholder>
                      <a-image :src="image.url" :width="200" :preview="false" />
                    </template>
                  </a-image>
                </template>
                <a-card-meta :title="image.name"></a-card-meta>
                <template #actions>
                  <a-button size="small" type="text">重命名</a-button>
                  <a-button size="small" type="text" danger>删除</a-button>
                </template>
              </global-card>
            </a-col>
          </template>
        </a-row>
      </a-image-preview-group>

      <div class="pagination">
        <a-pagination
          v-model:current="current"
          v-model:pageSize="pageSize"
          :pageSizeOptions="[5, 10, 20, 30]"
          :total="imageList.totalCount"
          showSizeChanger
          @change="onchange"
        />
      </div>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
  import { ref, toRefs } from 'vue'

  import { GlobalCard } from '@/components/global-card'
  import useMostlyStore from '@/stores/mostly'

  const mostlyStore = useMostlyStore()
  const { imageList, isMainSpinning } = toRefs(mostlyStore)
  const current = ref<number>(1)
  const pageSize = ref<number>(10)
  const prop = defineProps({
    itemId: {
      type: Number,
      default: 0
    }
  })
  const { itemId } = toRefs(prop)
  const onchange = (page: number, _pageSize: number) => {
    current.value = page
    pageSize.value = _pageSize
    mostlyStore.asyncGetImageList(itemId.value, current.value, pageSize.value)
  }
</script>

<style lang="scss" scoped>
  .image-content {
    @apply w-full h-full p-20;

    .pagination {
      @apply flex-center m-y-20;

      :deep(.ant-select-selector) {
        @apply w-100 text-center;
      }
    }

    :deep(.ant-card-body) {
      @apply p-10 truncate;
    }
  }
</style>
