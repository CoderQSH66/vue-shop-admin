<template>
  <Teleport to="body">
    <div class="global-drawer">
      <a-drawer class="global-drawer__drawer" v-bind="attrs">
        <template v-for="(slot, slotName) of $slots" #[slotName]="slotData">
          <slot :name="slotName" v-bind="slotData || {}"></slot>
        </template>
      </a-drawer>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
  import { useAttrs, computed } from 'vue'

  interface IDrawerPropsType {
    open: boolean
    title?: string
    width?: number
    closable?: boolean
    placement?: 'top' | 'right' | 'bottom' | 'left'
    headerStyle?: any
  }
  const props = withDefaults(defineProps<IDrawerPropsType>(), {
    title: '默认标题',
    width: 375,
    closable: true,
    placement: 'right',
    headerStyle: () => ({ padding: '24px' })
  })
  console.log(props)
  // console.log(useAttrs())
  const attrs = computed(() => {
    return {
      ...props,
      ...useAttrs()
    }
  })
</script>

<style lang="scss" scoped>
  :global(.global-drawer__drawer) {
    // background-color: rebeccapurple !important;
  }
</style>
