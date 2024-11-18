const usersRoute = [
  {
    path: '/',
    component: () => import('layouts/UsersLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'tables', name: 'tables', component: () => import('pages/TablesPage.vue') },
      { path: 'order-type', name: 'order_type', component: () => import('pages/UserOrdertype.vue') },
      { path: 'reciept', name: 'reciept', component: () => import('pages/CustomersReciept.vue') },
    ],
  },
];

export default usersRoute;
