<template>
  <div :class="`edit-card ${active ? 'active' : ''}`">
    <a-card :title="title">
      <template #extra>
        <div class="extra">
          <div class="edit">
            <a-button type="text" @click.stop="$emit('edit')">
              <template #icon>
                <div class="i-ant:edit-outlined w-20 h-20"></div>
              </template>
            </a-button>
          </div>
          <div class="remove">
            <a-button type="text" @click.stop="$emit('remove')">
              <template #icon>
                <div class="i-ant-delete-outlined w-20 h-20"></div>
              </template>
            </a-button>
          </div>
        </div>
      </template>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  interface IPropsType {
    title: string
    active?: boolean
  }
  const props = withDefaults(defineProps<IPropsType>(), {
    title: '标题',
    active: false
  })
</script>

<style lang="scss" scoped>
  .edit-card {
    @apply cursor-pointer;

    .ant-card-bordered {
      border: none;
    }

    .ant-card {
      @apply m-y-10;

      &:hover {
        :deep(.ant-card-head) {
          color: var(--primary-color);
          background-color: #e6f4ff;
        }
      }
    }

    :deep(.ant-card-head) {
      @apply p-10 text-18 text-gray-500 border-0;

      .ant-card-extra {
        @apply flex-center;

        .extra {
          @apply flex items-center;

          .edit {
            @apply m-r-10;
          }

          .ant-btn {
            @apply flex-center color-[var(--primary-color)];
          }
        }
      }
    }
  }

  .active {
    :deep(.ant-card-head) {
      color: var(--primary-color);
      background-color: #e6f4ff !important;
    }
  }
</style>
