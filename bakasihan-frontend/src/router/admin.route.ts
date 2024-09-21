const adminsRoute = [
  {
    path: '/admin/',
    component: () => import('layouts/AdminsLayout.vue'),
    children: [
      { path: '', name: 'admin_index', component: () => import('pages/AdminsIndexPage.vue') },
      { path: 'categories', name: 'menu_category', component: () => import('pages/CategoryPage.vue') },
      { path: 'addmenu', name: 'add_menu', component: () => import('pages/AddMenuPage.vue') },
    ],
  },
];

export default adminsRoute;
