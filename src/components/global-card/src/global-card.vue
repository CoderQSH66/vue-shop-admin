<template>
  <div class="global-card">
    <a-card v-bind="$attrs">
      <template v-for="(vallue, name) of $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </a-card>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
