<template>
  <div class="upload">
    <a-upload-dragger
      v-model:fileList="fileList"
      :name="name"
      :multiple="true"
      :action="action"
      :headers="{
        token: local.get('i-token')
      }"
      :data="data"
      show-upload-list
      @change="handleChange"
      :beforeUpload="beforeUpload"
    >
      <p class="ant-upload-drag-icon flex-center">
        <i class="i-ant:upload-outlined block w-60 h-60"></i>
      </p>
      <p class="ant-upload-text">点击或者拖拽上传文件</p>
      <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
      </p>
    </a-upload-dragger>
  </div>
</template>

<script setup lang="ts">
  import { message as $message } from 'ant-design-vue'
  import { ref, toRefs } from 'vue'

  import { local } from '@/utils/Storage'

  import type { UploadChangeParam } from 'ant-design-vue'

  const fileList = ref<any>()
  interface IpropFileType {
    data: any
    name: string
    action: string
  }
  const props = defineProps<IpropFileType>()
  const { data, name, action } = toRefs(props)
  const emits = defineEmits(['success'])

  /** 上传文件针对不同状态的处理 */
  const handleChange = (info: UploadChangeParam) => {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList)
    // }
    if (info.file.status === 'done') {
      console.log(fileList.value)
      emits('success')
      $message.success(`${info.file.name} 上传成功`)
    } else if (info.file.status === 'error') {
      console.log(fileList.value)
      $message.error(`${info.file.name} 上传失败`)
    }
  }
  /** 上传文件前的校验 */
  const beforeUpload = (file: any) => {
    console.log(file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      $message.error('请选择JPG/PNG图片!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      $message.error('文件大小不能超过2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  const handleDrop = (info: any) => {
    console.log(info)
  }
</script>

<style lang="less" scoped></style>
