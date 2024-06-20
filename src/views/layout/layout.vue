<template>
  <div class="layout">
    <a-layout class="a-layout">
      <a-layout-sider class="a-sider" breakpoint="lg" :collapsedWidth="0">
        <a-side></a-side>
      </a-layout-sider>
      <a-layout class="a-layout_main">
        <a-layout-header class="a-header">
          <a-header></a-header>
        </a-layout-header>
        <a-layout-content class="a-content">
          <a-content></a-content>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
  import AContent from './cpns/a-content.vue'
  import AHeader from './cpns/a-header.vue'
  import ASide from './cpns/a-side.vue'
</script>

<style lang="scss" scoped>
  .layout {
    height: 100vh;

    .a-layout {
      height: 100%;

      .a-sider {
        background-color: var(--primary-bary-color);
      }

      .a-layout_main {
        .a-header {
          padding-inline: 20px;
          background-color: var(--primary-color);
        }

        .a-content {
          padding: 20px;
        }
      }
    }
  }
</style>
