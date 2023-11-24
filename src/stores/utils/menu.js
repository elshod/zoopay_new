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
    icon: 'toc',    
    component: () => import('@/views/dashboard/pages/category.vue'),
  },
  {
    path: 'subcategory',
    name: 'subcategory',
    title: 'Subkategoriyalar',
    icon: 'article',    
    component: () => import('@/views/dashboard/pages/subcategory.vue'),
  },
  {
    path: 'childsubcat',
    name: 'childsubcat',
    title: 'Toifalar',
    icon: 'checklist',    
    component: () => import('@/views/dashboard/pages/childsubcat.vue'),
  },

]