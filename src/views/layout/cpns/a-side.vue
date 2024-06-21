<template>
  <div class="side">
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
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
            <a-side :menus="menu.child"></a-side>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
  import { reactive, toRefs } from 'vue'

  import router from '@/router'

  interface IPropsType {
    menus: any[]
  }
  const props = defineProps<IPropsType>()
  const { menus } = toRefs(props)
  const state = reactive({
    selectedKeys: ['6'],
    openKeys: ['6']
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
    state.selectedKeys = e.keyPath
    // console.log(state)
    // console.log(e)
    router.push(e.key)
  }
  const onOpenChange: any = (openKeys: string[]) => {
    // state.openKeys = [openKeys.at(-1)]
    // console.log(state)
  }
</script>

<style lang="scss" scoped>
  .side {
    height: 100%;

    .a-menu {
      height: 100%;

      :deep(.ant-menu-item) {
        height: 64px !important;

        &:hover {
          color: var(--primary-color);
          background-color: #e6f4ff;
        }
      }

      :deep(.ant-menu-submenu-title) {
        display: flex;
        align-items: center;
        height: 64px !important;
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
