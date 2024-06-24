import { CountUp } from 'countup.js'
import { ref, onMounted, watch } from 'vue'

import useHomeStore from '@/stores/home'

const homeStore = useHomeStore()

export default function useHomeCount(timeList: any[]) {
  const onChangeTags: any = (tag: string) => {
    const index = timeList.findIndex((item) => item.label === tag)
    const trueIndex = timeList.findIndex((item) => item.checked === true)
    if (!timeList[index].checked) {
      timeList[index].checked = true
      timeList[trueIndex].checked = false
      homeStore.asyncGetRecentData(tag as any)
    }
  }
  const countRefList = ref<any[]>([])
  const pushCountLish = (el: any) => {
    countRefList.value.push(el)
  }
  const countList = ref<any[]>([])
  onMounted(() => {
    let count = 0
    watch(
      countRefList,
      () => {
        countList.value = countRefList.value
        count += 1

        if (count === 4) {
          countRefList.value?.forEach((item) => {
            const countAnimate = new CountUp(item, item.textContent, {
              useGrouping: true, // 开启逗号,
              // 允许小数
              decimal: '.',
              decimalPlaces: 1,
              duration: 1
            })
            countAnimate.start()
          })
        }
      },
      {
        deep: true
      }
    )
  })
  return {
    onChangeTags,
    pushCountLish
  }
}
