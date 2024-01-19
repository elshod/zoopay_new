import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/default-layout.vue';
import { dashboard_menu } from '../stores/utils/menu';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/default/homeView.vue'),
        },
        {
          path:'fav',
          name:'fav',
          component: () => import('@/views/default/favsPage.vue')
        },
        
        {
          path: 'notices',
          name: 'notices',
          component: () => import('@/views/default/all-notice.vue'),
        },
        {
          path:'notice/:id',
          name:'notice',
          component: () => import('@/views/default/notice-page.vue')
        }
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/layouts/auth-layout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/auth/login-page.vue'),
        },
        {
          path: 'reg',
          name: 'reg',
          component: () => import('@/views/auth/reg-page.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/layouts/dashboard-layout.vue'),
      children: [...dashboard_menu],
    },
    {
      path:'/user',
      name:'user',
      component: () => import('@/layouts/user-layout.vue'),
      children: [
        {
          path: '',
          name: 'userdashboard',
          component: () => import('@/views/user/user-homepage.vue'),
        },
        {
          path:'newadd',
          name:'newadd',
          component: () => import('@/views/user/new_add.vue')
        },
        {
          path:'adds',
          name:'adds',
          component: () => import('@/views/user/user-adds.vue')
        },
        {
          path:'msg',
          name:'msg',
          component: () => import('@/views/user/user-message.vue')
        },
        {
          path:'settings',
          name:'userSettings',
          component: () => import('@/views/user/user-settings.vue')
        },
        {
          path:'fav',
          name:'userFav',
          component: () => import('@/views/default/favsPage.vue')
        },
      ]
    }
  ],
});

export default router;
