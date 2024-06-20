<template>
  <div class="login">
    <a-row h-full>
      <a-col :xs="24" :sm="24" :md="15">
        <div class="left">
          <div class="desc">
            <div class="title">欢迎光临</div>
            <div class="info">
              此站点是由 Vue Shop Admin 搭建<span class="font-700 text-18 p-x-5 hover:(cursor-pointer)"
                >点击立即学习</span
              >
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="9">
        <div class="right">
          <div class="welcome">欢迎回来</div>
          <div class="split">
            <a-divider>账号密码登录</a-divider>
          </div>
          <div class="form w-400">
            <a-form
              :model="formState"
              ref="formRef"
              name="normal_login"
              class="login-form w-full"
              :label-col="{ style: { width: '100px' } }"
              :wrapper-col="{ span: 14 }"
              :rules="rules"
            >
              <a-form-item label="用户名" name="username">
                <a-input v-model:value="formState.username" placeholder="请输入用户名" allow-clear size="large">
                  <template #prefix>
                    <i class="i-ant-user-outlined w-20 h-20"></i>
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item label="密码" name="password">
                <a-input-password v-model:value="formState.password" placeholder="请输入密码" allow-clear size="large">
                  <template #prefix>
                    <i class="i-ant-safety-outlined w-20 h-20"></i>
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item class="flex-center">
                <div class="operate w-250" flex-between>
                  <a-button size="large" type="primary" class="w-100" :loading="loading" @click="onLogin"
                    >登录</a-button
                  >
                  <a-button size="large" type="primary" danger class="w-100" @click="onReset">重置</a-button>
                </div>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, toRefs } from 'vue'

  import useLoginStore from '@/stores/login'

  import type { Rule, FormInstance } from 'ant-design-vue/es/form'

  const loginStore = useLoginStore()
  const { loading } = toRefs(loginStore)
  const formRef = ref<FormInstance>()
  const formState = reactive({ username: '', password: '' })

  /** 用户名校验 */
  const usernameValidator = (rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject(new Error('请输入用户名'))
    }
    return Promise.resolve()
  }
  /** 密码校验 */
  const passwordValidator = (rule: Rule, value: string) => {
    if (!value) {
      return Promise.reject(new Error('请输入密码'))
    }
    return Promise.resolve()
  }
  const rules: Record<string, Rule[]> = {
    username: [{ required: true, validator: usernameValidator, trigger: 'blur' }],
    password: [{ required: true, validator: passwordValidator, trigger: 'blur' }]
  }
  /** 登录操作 */
  const onLogin = async () => {
    try {
      await formRef.value?.validate()
      loginStore.asyncFetchLogin(formState)
    } catch (error) {
      // console.log(error)
    }
  }

  /** 重置操作 */
  const onReset = () => {
    formRef.value?.resetFields()
  }

  /** 监听回车 */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      onLogin()
    }
  })
  window.addEventListener('resize', () => {})
</script>

<style lang="scss" scoped>
  .login {
    height: 100vh;

    .left {
      @apply bg-cyan-600 h-full select-none flex-center;

      .desc {
        @apply -transform-translate-y-30;

        .title {
          @apply font-700 text-40 color-white p-y-20;
        }

        .info {
          @apply color-white text-16 font-300;
        }
      }
    }

    .right {
      @apply bg-white h-full flex-wh-center;

      .welcome {
        @apply font-800 text-38 color-cyan-600;
      }

      .split {
        @apply sm:(w-400) xl:(w-500) p-y-15;

        .ant-divider {
          font-size: 16px;
          color: var(--primary-bary-color);
          border-color: var(--primary-bary-color);
        }
      }

      .form {
        .ant-form-item {
          margin-bottom: 30px;

          :deep(label) {
            height: 40px;
          }
        }
      }
    }
  }
</style>
