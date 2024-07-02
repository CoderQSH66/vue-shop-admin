<template>
  <Teleport to="body">
    <div class="command-modal">
      <a-modal class="command-modal__modal" v-bind="attrs">
        <template v-for="(slot, slotName) of $slots" #[slotName]="slotData">
          <slot :name="slotName" v-bind="slotData || {}"></slot>
        </template>
      </a-modal>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { useAttrs, computed } from 'vue'

  import type { IModalProps } from './types'

  const props = withDefaults(defineProps<IModalProps>(), {
    closable: false,
    width: 375,
    cancelText: '取消',
    okText: '确定'
  })
  // console.log(props)
  // console.log(useAttrs())
  const attrs = computed(() => {
    return {
      ...props,
      ...useAttrs()
    }
  })
</script>

<style lang="less" scoped></style>
