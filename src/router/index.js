import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/default-layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: DefaultLayout,
      children: [
        {
          path:'',
          name: 'home',
          component: () => import('@/views/default/homeView.vue')
        }
      ]
    },    
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/layouts/auth-layout.vue'),
      children: [
        {
          path:'',
          name: 'login',
          component: () => import('@/views/auth/login-page.vue')
        },
        {
          path:'reg',
          name: 'reg',
          component: () => import('@/views/auth/reg-page.vue')
        },
      ]
    },
    {
      path:'/dashboard',
      name: 'dashboard',
      component: () => import('@/layouts/dashboard-layout.vue'),
      children: [
        {
          path:'',
          name:'home-dashboard',
          component: () => import('@/views/dashboard/home-dashboard.vue'),
          meta: {
            roles: ['admin'],
            title: 'Boshqaruv paneli'
          }
        }
      ]
    }
  ]
})

export default router
