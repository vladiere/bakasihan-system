const usersRoute = [
  {
    path: '/',
    component: () => import('layouts/UsersLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      { path: 'customers', name: 'customers', component: () => import('pages/CustomersPage.vue') },
      { path: 'tables', name: 'tables', component: () => import('pages/TablesPage.vue') },
      { path: 'orders', name: 'orders', component: () => import('pages/OrdersPage.vue') },
      { path: 'sales', name: 'sales', component: () => import('pages/SalesPage.vue') },
      { path: 'order-type', name: 'order_type', component: () => import('pages/UserOrdertype.vue') },
      { path: 'reciept', name: 'reciept', component: () => import('pages/CustomersReciept.vue') },
    ],
  },
];

export default usersRoute;
