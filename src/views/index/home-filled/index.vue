<!-- eslint-disable import/named -->
<template>
  <div class="home-filled">
    <a-row :gutter="[24, 24]">
      <a-col :span="6" v-for="item in payData" :key="item.unit">
        <a-skeleton :active="state.active" :loading="state.loading">
          <global-card class="card" :title="item.title" hoverable>
            <template #extra>
              <a-tag :color="item.unitColor ? (item.unitColor === 'danger' ? 'error' : item.unitColor) : 'success'">{{
                item.unit
              }}</a-tag>
            </template>
            <div
              class="content"
              :ref="
                (el) => {
                  pushCountLish(el)
                }
              "
            >
              {{ item.value }}
            </div>
            <template #actions>
              <div class="sub">
                <span>{{ item.subTitle }}</span>
                <span>{{ item.subValue }}</span>
              </div>
            </template>
          </global-card>
        </a-skeleton>
      </a-col>
    </a-row>
    <!-- 分类展示 -->
    <div class="category">
      <a-row :gutter="[24, 24]">
        <template v-for="(item, index) of categoryList" :key="index">
          <a-col :span="3">
            <div class="info" @click="$router.push(item.path)">
              <div :class="['icon', item.color]">
                <component :is="item.icon"></component>
              </div>
              <span>{{ item.title }}</span>
            </div>
          </a-col>
        </template>
      </a-row>
    </div>
    <div class="echart">
      <a-row :gutter="[24, 24]">
        <a-col :span="12">
          <a-skeleton :active="state.active" :loading="state.loading">
            <global-card class="card" title="最近数据" hoverable>
              <e-bar :echartData="echartData" height="350px"></e-bar>
              <template #extra>
                <div class="tags">
                  <template v-for="item of timeList" :key="item.label">
                    <a-checkable-tag :checked="item.checked" @change="onChangeTags(item.label)">
                      {{ item.label }}
                    </a-checkable-tag>
                  </template>
                </div>
              </template>
            </global-card>
          </a-skeleton>
        </a-col>

        <a-col :span="12">
          <a-row :gutter="[24, 24]">
            <a-col :span="24">
              <a-skeleton :active="state.active" :loading="state.loading">
                <global-card class="card" title="店铺及商品提示" hoverable>
                  <status-list :data="statusData.goods"></status-list>
                  <template #extra>
                    <a-tag color="error">店铺及商品提示</a-tag>
                  </template>
                </global-card>
              </a-skeleton>
            </a-col>
            <a-col :span="24">
              <a-skeleton :active="state.active" :loading="state.loading">
                <global-card class="card" title="交易提示" hoverable>
                  <status-list :data="statusData.order"></status-list>
                  <template #extra>
                    <a-tag color="error">需要立即处理的订单</a-tag>
                  </template>
                </global-card>
              </a-skeleton>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, toRefs } from 'vue'

  import { GlobalCard } from '@/components/global-card'
  // eslint-disable-next-line import/named
  import { EBar } from '@/components/global-echart'
  import useHomeCount from '@/hooks/useHomeCount'
  import useHomeStore from '@/stores/home'

  import StatusList from '../cpns/status-list.vue'

  const homeStore = useHomeStore()
  const { payData, categoryList, echartData, statusData } = toRefs(homeStore)
  const timeList = reactive([
    {
      label: 'month',
      checked: false
    },
    {
      label: 'week',
      checked: true
    },
    {
      label: 'hour',
      checked: false
    }
  ])
  const state = reactive({
    loading: true,
    active: true
  })
  homeStore.asyncGetHomeData().then(() => {
    state.loading = false
    state.active = false
  })
  homeStore.asyncGetRecentData('week')

  // hooks
  const { onChangeTags, pushCountLish } = useHomeCount(timeList)
</script>

<style lang="scss" scoped>
  .home-filled {
    @apply w-full h-full bg-white-500;

    .card {
      .content {
        @apply text-32 font-bold;
      }

      .sub {
        @apply w-full h-30 flex justify-around text-16 text-gray-500;
      }

      .tags {
        .ant-tag {
          @apply text-16 font-bold;
        }
      }

      :deep(.ant-card-head-title) {
        @apply text-18 font-bold text-gray-500;
      }

      :deep(.ant-card-extra) {
        .ant-tag {
          @apply h-30 text-16 line-height-normal;
        }
      }
    }

    .category {
      padding: 10px 0;

      .info {
        @apply flex-col-center w-full items-center p-20 bg-gray-100 hover:(cursor-pointer shadow-md) b-rd-6;

        .icon {
          @apply w-30 h-30 m-y-10;
        }
      }
    }

    .echart {
      margin-top: 10px;

      .card {
        .ant-tag-checkable-checked {
          background-color: var(--primary-color) !important;
        }

        .ant-tag-checkable:not(.ant-tag-checkable-checked):hover {
          color: var(--primary-color) !important;
        }
      }
    }
  }
</style>
