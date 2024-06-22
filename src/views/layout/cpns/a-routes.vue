<template>
  <div class="route-tag">
    <a-tabs
      v-model:activeKey="activeKey"
      size="large"
      type="editable-card"
      :tabBarGutter="10"
      hideAdd
      @tabScroll="callback"
      @edit="onEdit"
      v-on:change="changeTab"
    >
      <a-tab-pane v-for="item in tagsList" :key="item.path" :tab="item.name"></a-tab-pane>
      <!-- <template #rightExtra>展开关闭全部</template> -->
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
  import { computed, toRefs } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  import useHomeStore from '@/stores/home'

  import type { TabsProps } from 'ant-design-vue'

  const router = useRouter()
  const route = useRoute()
  const homeStore = useHomeStore()
  const { tagsList } = toRefs(homeStore)
  const activeKey = computed({
    get() {
      return route.path
    },
    set(value) {
      router.push(value)
    }
  })

  const callback: TabsProps['onTabScroll'] = (val) => {
    // console.log(val)
  }
  const onEdit: any = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      changeTab(homeStore.removeTags(targetKey, activeKey.value))
    }
  }
  const changeTab: any = (key: string) => {
    router.push(key)
  }
</script>

<style lang="scss" scoped>
  .route-tag {
    height: 50px;
    line-height: 50px;

    .ant-tabs {
      padding-top: 5px;

      :deep(.ant-tabs-nav-wrap) {
        border: none;
      }

      :deep(.ant-tabs-nav) {
        margin: 0;

        &::before {
          border: none;
        }

        .ant-tabs-content-holder {
          display: none;
        }

        .ant-tabs-tab {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 16%);
          border-radius: 8px;

          &:hover {
            color: var(--primary-color);
          }

          .ant-tabs-tab-btn:focus:not(:focus-visible) {
            color: var(--primary-color) !important;
          }

          &.ant-tabs-tab-active {
            background-color: var(--primary-color);

            .ant-tabs-tab-btn {
              // color: var(--primary-color) !important;
              color: #fff !important;

              &:focus {
                color: #fff !important;
              }
            }

            .ant-tabs-tab-remove {
              color: var(--primary-color) !important;
            }
          }
        }
      }
    }
  }
</style>
