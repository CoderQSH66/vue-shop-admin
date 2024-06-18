<template>
  <div class="login">
    <a-row h-full>
      <a-col :span="16">
        <div class="left bg-cyan-600 h-full" flex-center>
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
      <a-col :span="8">
        <div class="right bg-white h-full" flex-wh-center>
          <div class="welcome font-800 text-38 color-black">欢迎回来</div>
          <div class="split w-400 p-y-15">
            <a-divider class="text-26 color-white">账号密码登录</a-divider>
          </div>
          <div class="form w-400">
            <a-form
              :model="formState"
              name="normal_login"
              class="login-form w-full"
              :label-col="{ style: { width: '100px' } }"
              :wrapper-col="{ span: 14 }"
            >
              <a-form-item label="用户名" name="username">
                <a-input v-model:value="formState.username" placeholder="请输入用户名" />
              </a-form-item>
              <a-form-item label="密码" name="password">
                <a-input-password v-model:value="formState.password" placeholder="请输入密码" />
              </a-form-item>
              <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit" class="w-100">登录</a-button>
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

  const formState = reactive({ username: '', password: '' })
</script>

<style lang="scss" scoped>
  .login {
    height: 100vh;

    .ant-divider {
      font-size: 16px;
      color: #696969;
    }

    .form {
      .ant-form-item {
        margin-bottom: 30px;
      }
    }
  }
</style>
