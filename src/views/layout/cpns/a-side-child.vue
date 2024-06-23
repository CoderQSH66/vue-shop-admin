<template>
  <div class="side-child">
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
  </div>
</template>

<script setup lang="ts">
  import { toRefs } from 'vue'

  // import useHomeStore from '@/stores/home'

  const props = defineProps<{ menus: any[] }>()
  const { menus } = toRefs(props)
  // @click="onTabMenu(menu.name, menu.frontpath)"
  // const homeStore = useHomeStore()
  // const onTabMenu = (name: string, path: string) => {
  // homeStore.addTags({
  //   name,
  //   path
  // })
  // }
</script>

<style lang="scss" scoped></style>
