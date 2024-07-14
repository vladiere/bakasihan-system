const adminsRoute = [
  {
    path: '/admin',
    component: () => import('layouts/AdminsLayout.vue'),
    children: [
      { path: '', name: 'admin_index', component: () => import('pages/AdminsIndexPage.vue') },
    ],
  },
];

export default adminsRoute;
