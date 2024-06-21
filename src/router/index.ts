import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

import { local } from '@/utils/Storage'

NProgress.configure({ showSpinner: true, color: '#df1234' })
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/views/layout/layout.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('@/views/NotFound/index.vue'),
      meta: {
        title: '页面未找到'
      }
    }
  ]
})

// 白名单
const whitelist = ['login', 'NotFound']

// 全局路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!whitelist.includes(to.name as string)) {
    const token = local.get('i-token')
    if (!token) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
