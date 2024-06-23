<template>
  <div class="e-bar">
    <global-echart :options="options" :height="height"></global-echart>
  </div>
</template>

<script setup lang="ts">
  import { computed, toRefs } from 'vue'

  import globalEchart from '../global-echart.vue'

  interface IProps {
    echartData: any
    height?: string
  }
  const props = defineProps<IProps>()
  const { echartData } = toRefs(props)

  const options = computed(() => {
    return {
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: {
            readOnly: false
          },
          magicType: {
            type: ['line', 'bar']
          },
          restore: {},
          saveAsImage: {}
        }
      },
      color: ['#0891b2'],
      xAxis: {
        type: 'category',
        data: echartData.value?.x
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: echartData.value?.y,
          type: 'bar'
        }
      ]
    }
  })
</script>

<style lang="scss" scoped></style>
