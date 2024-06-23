<template>
  <div id="main-echart" :style="{ height: height }" ref="echartRef"></div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts'
  import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'

  const echartRef = ref()
  const props = defineProps({
    options: {
      type: Object,
      default: () => ({})
    },
    height: {
      type: String,
      default: '400px'
    }
  })
  const { options } = toRefs(props)

  onMounted(() => {
    const myChart = echarts.init(echartRef?.value)
    watch(
      options,
      () => {
        myChart.setOption(options?.value)
      },
      {
        deep: true,
        immediate: true
      }
    )
    window.addEventListener('resize', () => {
      myChart.resize()
    })
  })
  // onUnmounted(() => {
  //   echarts.init(echartRef?.value).dispose()
  // })
</script>

<style lang="scss" scoped>
  #main-echart {
    width: 100%;
  }
</style>
