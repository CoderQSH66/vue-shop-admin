<template>
  <div class="login">
    <a-row h-full>
      <a-col :xs="24" :sm="24" :md="15">
        <div class="left bg-cyan-600 h-full select-none" flex-center>
          <div class="desc -transform-translate-y-30">
            <div class="title font-700 text-40 color-white p-y-20">欢迎光临</div>
            <div class="info color-white text-16 font-300">
              此站点是由 Vue Shop Admin 搭建<span class="font-700 text-18 p-x-5 hover:(cursor-pointer)"
                >点击立即学习</span
              >
            </div>
          </div>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="9">
        <div class="right bg-white h-full" flex-wh-center>
          <div class="welcome font-800 text-38 color-cyan-600">欢迎回来</div>
          <div class="split sm:(w-400) xl:(w-500) p-y-15">
            <a-divider>账号密码登录</a-divider>
          </div>
          <div class="form w-400">
            <a-form
              :model="formState"
              name="normal_login"
              class="login-form w-full"
              :label-col="{ style: { width: '100px' } }"
              :wrapper-col="{ span: 14 }"
              :rules="rules"
            >
              <a-form-item label="用户名" name="username">
                <a-input v-model:value="formState.username" placeholder="请输入用户名" allow-clear size="large">
                  <template #prefix>
                    <i class="i-ant-user-outlined w-10 h-10"></i>
                  </template>
                </a-input>
              </a-form-item>
              <a-form-item label="密码" name="password">
                <a-input-password v-model:value="formState.password" placeholder="请输入密码" allow-clear size="large">
                  <template #prefix>
                    <i class="i-ant-setting-filled"></i>
                  </template>
                </a-input-password>
              </a-form-item>
              <a-form-item class="flex-center">
                <a-button size="large" type="primary" html-type="submit" class="w-100">登录</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  import type { Rule } from 'ant-design-vue/es/form'

  const formState = reactive({ username: '', password: '' })
  const rules: Record<string, Rule[]> = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }
</script>

<style lang="scss" scoped>
  .login {
    height: 100vh;

    .ant-divider {
      font-size: 16px;
      color: #bfbfbf;
      border-color: #bfbfbf;
    }

    .form {
      .ant-form-item {
        margin-bottom: 30px;

        :deep(label) {
          height: 100%;
        }
      }
    }
  }
</style>
