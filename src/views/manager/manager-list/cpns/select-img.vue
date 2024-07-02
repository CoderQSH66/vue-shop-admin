<template>
  <div class="select-img">
    <div class="avata">
      <img class="image" :src="modelValue" />
    </div>
    <div class="select">
      <i @click="isOpen = true" class="i-ant-plus-outlined w-100 h-100 color-gray-300"></i>
    </div>
    <command-modal :onOk="onOk" :onCancel="onCancel" :open="isOpen" :width="1100">
      <template #title>
        <h3>选择图片</h3>
      </template>
      <ImageList :isSelect="true"></ImageList>
    </command-modal>
  </div>
</template>

<script setup lang="ts">
  import { CommandModal } from '@/components/command-modal'
  import useManagerStore from '@/stores/manager'
  import ImageList from '@/views/mostly/image-list/index.vue'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    }
  })
  const managerStore = useManagerStore()
  const { selectImage } = toRefs(managerStore)
  const isOpen = ref(false)
  const emits = defineEmits(['update:modelValue'])
  const onOk = () => {
    emits('update:modelValue', selectImage.value.url)
    isOpen.value = false
  }
  const onCancel = () => {
    isOpen.value = false
  }
</script>

<style lang="scss" scoped>
  .select-img {
    @apply flex;

    .avata {
      @apply w-100 h-100 m-r-10;

      .image {
        @apply w-full h-full block object-cover;
      }
    }

    .select {
      @apply w-100 border-1  border-solid border-gray-300 hover:(cursor-pointer);
    }
  }
</style>
