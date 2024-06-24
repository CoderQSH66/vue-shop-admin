<template>
  <div class="layout">
    <a-layout class="a-layout">
      <a-layout-sider class="a-sider" breakpoint="lg" collapsedWidth="64" :collapsed="isCollapsible">
        <div class="logo">LOGO</div>
        <a-side :menus="menus"></a-side>
      </a-layout-sider>
      <a-layout class="a-layout_main">
        <a-layout-header class="a-header">
          <a-header ref="aheaderRef"></a-header>
        </a-layout-header>
        <a-layout-content class="a-content">
          <a-routes></a-routes>
          <div class="a-b">
            <!-- 路由视图 -->
            <router-view v-slot="{ Component }">
              <transition
                name="custom-classes"
                mode="out-in"
                enterActiveClass="animate__animated animate__fadeIn"
                leaveActiveClass="animate__animated animate__fadeOutDown"
              >
                <keep-alive :max="10">
                  <component :is="Component"></component>
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, toRefs } from 'vue'

  import useLoginStore from '@/stores/login'

  import AHeader from './cpns/a-header.vue'
  import ARoutes from './cpns/a-routes.vue'
  import ASide from './cpns/a-side.vue'

  const loginStore = useLoginStore()
  const { menus } = toRefs(loginStore)

  const aheaderRef = ref<InstanceType<typeof AHeader>>()
  const isCollapsible = computed(() => {
    return aheaderRef.value?.isCollapsible
  })
</script>

<style lang="scss" scoped>
  .layout {
    height: 100vh;

    .a-layout {
      height: 100%;

      .logo {
        @apply h-64 font-700 text-16  p-y-20 p-x-20;

        background-color: var(--primary-color);
      }

      .a-sider {
        height: 100vh;
        overflow: auto;
        background-color: #fff;
        // 隐藏滚动条
        &::-webkit-scrollbar {
          display: none;
        }
      }

      .a-layout_main {
        .a-header {
          padding-inline: 20px;
          background-color: var(--primary-color);
        }

        .a-content {
          position: relative;
          padding: 20px;
          padding-top: 0;
          background-color: #fff;

          .a-b {
            // 隐藏滚动条
            &::-webkit-scrollbar {
              display: none;
            }

            position: absolute;
            inset: 0;
            top: 50px;
            width: 100%;
            padding: 20px;
            overflow-y: scroll;
            background-color: var(--primary-gary-color);
          }
        }
      }
    }
  }
</style>
