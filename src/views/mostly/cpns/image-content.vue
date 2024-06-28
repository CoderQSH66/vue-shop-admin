<template>
  <a-spin :spinning="isMainSpinning" :indicator="h('i', {}, [])">
    <div class="image-content">
      <a-image-preview-group>
        <a-row :gutter="[24, 24]">
          <template v-for="image of imageList.list" :key="image.id">
            <a-col :span="6">
              <global-card hoverable>
                <template #cover>
                  <a-image :src="image.url" height="160px" fallback="../../../assets/img/error.jpg">
                    <template #placeholder>
                      <a-image :src="image.url" :width="200" :preview="false" />
                    </template>
                  </a-image>
                </template>
                <a-card-meta>
                  <template #title>
                    <span v-if="imgId !== image.id">{{ image.name }}</span>
                    <a-input
                      v-else
                      allowClear
                      ref="inputRef"
                      @blur="onBlur(image.name, image.id, $event)"
                      @pressEnter="onBlur(image.name, image.id, $event)"
                      placeholder="请输入新名称"
                    ></a-input>
                  </template>
                </a-card-meta>
                <template #actions>
                  <a-button size="small" type="text" @click="onRenameImg(image.id)">重命名</a-button>
                  <a-popconfirm
                    title="是否要删除该图片?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="onDeleteImg(image.id)"
                  >
                    <a-button size="small" type="text" danger>删除</a-button>
                  </a-popconfirm>
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
  import { h, ref, toRefs } from 'vue'

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
  const imgId = ref<number>(0)
  const inputRef = ref<any>(null)

  const onchange = (page: number, _pageSize: number) => {
    current.value = page
    pageSize.value = _pageSize
    mostlyStore.asyncGetImageList(itemId.value, current.value, pageSize.value)
  }
  const onDeleteImg = async (id: number) => {
    await mostlyStore.asyncDeleteImage([id])
    mostlyStore.asyncGetImageList(itemId.value, current.value, pageSize.value)
  }
  const onRenameImg = (id: number) => {
    imgId.value = id
  }
  const onBlur = async (name: string, id: number, e: any) => {
    // console.log(e.target.value)
    if (name === e.target.value || e.target.value === '') {
      imgId.value = -1
      // console.log(name)
      return
    }
    await mostlyStore.asyncUpdateImageName(id, e.target.value)
    imgId.value = -1

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
