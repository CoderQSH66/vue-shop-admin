<template>
  <div class="status-list">
    <div class="box">
      <template v-for="(item, index) of data" :key="index">
        <div class="info">
          <div class="value">{{ item.value }}</div>
          <div class="label">{{ item.label }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({})
    }
  })
</script>

<style lang="scss" scoped>
  .status-list {
    width: 100%;
    height: 110px;

    .box {
      @apply w-full h-full flex  justify-around;

      .info {
        @apply flex-col-center items-center flex-1 m-x-10 bg-gray-100;

        .value {
          @apply text-30 font-400;
        }

        .label {
          @apply text-16 font-400 mt-10 text-blueGray-500;
        }
      }
    }
  }
</style>
