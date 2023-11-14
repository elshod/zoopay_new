export const menu = [
  {
    path: 'product',
    name: 'product',
    component: () => import('@/views/dashboard/productList.vue'),
    title: 'Mahsulotlar',
    meta: {
      secure: true
    }
  },
  {
    path: 'priceprod',
    name: 'priceprod',
    component: () => import('@/views/dashboard/priceprodList.vue'),
    title: 'Narhlar',
    meta: {
      secure: true
    }
  },
  {
    path: 'food',
    name: 'food',
    component: () => import('@/views/dashboard/foodList.vue'),
    title: 'Taomlar',
    meta: {
      secure: true
    }
  },
  {
    path: 'time',
    name: 'time',
    component: () => import('@/views/dashboard/timeList.vue'),
    title: 'Taom vaqtlari',
    meta: {
      secure: true
    }
  },
  {
    path: 'menu',
    name: 'menu',
    component: () => import('@/views/dashboard/menuList.vue'),
    title: 'Menyular',
    meta: {
      secure: true
    }
  },

]