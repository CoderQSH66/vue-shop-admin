<template>
  <div class="global-card">
    <a-card v-bind="$attrs">
      <template v-for="(vallue, name) of $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  const _s = defineSlots()
  const defaultVnode = _s.default()[0]
  defineExpose({
    defaultVnode
  })
</script>

<style lang="scss" scoped></style>
