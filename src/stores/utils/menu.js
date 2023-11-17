export const dashboard_menu = [
  {
    path:'',
    name:'home-dashboard',
    title: 'Boshqaruv paneli',
    icon: 'home',
    component: () => import('@/views/dashboard/home-dashboard.vue'),
  },
  {
    path: 'category',
    name: 'category',
    title: 'Kategoriyalar',
    icon: 'summarize',    
    component: () => import('@/views/dashboard/pages/category.vue'),
  },

]