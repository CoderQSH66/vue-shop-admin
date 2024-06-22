<template>
  <div class="side">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="light"
      class="a-menu"
      @click="onClick"
      @openChange="onOpenChange"
    >
      <template v-for="menu of menus" :key="menu.id">
        <template v-if="menu.child.length === 0">
          <a-menu-item :key="menu.frontpath ? menu.frontpath : String(menu.id)">
            <template #icon>
              <div class="icon w-20 h-20"><component :is="menu.icon"></component></div>
            </template>
            {{ menu.name }}
          </a-menu-item>
        </template>
        <template v-else>
          <a-sub-menu :key="menu.frontpath ? menu.frontpath : String(menu.id)" :title="menu.name">
            <template #icon>
              <div class="icon w-20 h-20"><component :is="menu.icon"></component></div>
            </template>
            <a-side-child :menus="menu.child"></a-side-child>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
  import { computed, toRefs, watch } from 'vue'
  import { useRoute } from 'vue-router'

  import router from '@/router'
  import { local } from '@/utils/Storage'

  import ASideChild from './a-side-child.vue'

  interface IPropsType {
    menus: any[]
  }
  const props = defineProps<IPropsType>()
  const { menus } = toRefs(props)
  const route = useRoute()

  /** 根据路由切换菜单激活 */
  const selectedKeys = computed({
    get() {
      return [route.path]
    },
    set() {}
  })

  /** 根据路由切换侧边栏展开 */
  const openKeys = computed({
    get() {
      const openKeysList: string[] = []
      menus.value.forEach((menu: any) => {
        const openKey = menu.child.find((item: any) => {
          return item.frontpath === route.path
        })
        if (openKey) {
          openKeysList.push(String(menu.id))
        }
      })
      return openKeysList
    },
    set() {}
  })
  // const items = reactive([
  //   {
  //     key: '5',
  //     name: '后台面板',
  //     icon: 'help',
  //     child: [
  //       {
  //         key: '/',
  //         name: '主控台',
  //         icon: 'home-filled',
  //         child: []
  //       }
  //     ]
  //   },
  //   {
  //     key: '6',
  //     name: '商品管理',
  //     icon: 'shopping-bag',
  //     child: [
  //       {
  //         key: '/goods/list',
  //         name: '主控台',
  //         icon: 'shopping-cart-full',
  //         child: []
  //       },
  //       {
  //         key: '/category/list',
  //         name: '分类管理',
  //         icon: 'menu',
  //         child: []
  //       },
  //       {
  //         key: '/skus/list',
  //         name: '规格管理',
  //         icon: 'aim',
  //         child: []
  //       }
  //     ]
  //   }
  // ])

  const onClick = (e: any) => {
    // console.log(e)
    openKeys.value = local.get('openKeys') ?? []
    router.push(e.key)
  }
  const onOpenChange: any = (openKeys: string[]) => {
    // console.log(openKeys)
    local.set('openKeys', openKeys)
  }
  /** 侦听路由变化 */
  watch(route, (_, newValue) => {
    // console.log(openKeys.value)
  })
</script>

<style lang="scss" scoped>
  .side {
    height: 100%;

    .a-menu {
      height: 100%;

      :deep(.ant-menu-item) {
        height: 64px !important;

        &:hover {
          color: var(--primary-color) !important;
          background-color: #e6f4ff;
        }
      }

      :deep(.ant-menu-submenu-title) {
        display: flex;
        align-items: center;
        height: 64px !important;

        &:hover {
          color: #e6f4ff !important;
          background-color: var(--primary-color);
        }
      }

      .icon {
        width: 20px !important;
      }

      :deep(.ant-menu-item-selected) {
        color: var(--primary-color);
      }

      :deep(.ant-menu-submenu-selected > .ant-menu-submenu-title) {
        color: var(--primary-color);
      }
    }
  }
</style>
