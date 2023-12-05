export const dashboard_menu = [
  {
    path: '',
    name: 'home-dashboard',
    title: 'Boshqaruv paneli',
    icon: 'home',
    component: () => import('@/views/dashboard/home-dashboard.vue'),
  },
  {
    path: 'category',
    name: 'category',
    title: 'Bo`limlar',
    icon: 'toc',
    component: () => import('@/views/dashboard/pages/category.vue'),
  },
  {
    path: 'subcategory',
    name: 'subcategory',
    title: 'Turkumlar',
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
  {
    path: 'atribut',
    name: 'atribut',
    title: 'Xususiyatlar',
    icon: 'format_list_numbered',
    component: () => import('@/views/dashboard/pages/atribut.vue'),
  },
  {
    path: 'add',
    name: 'add',
    title: 'E`lonlar',
    icon: 'summarize',
    component: () => import('@/views/dashboard/pages/add.vue'),
  },
];