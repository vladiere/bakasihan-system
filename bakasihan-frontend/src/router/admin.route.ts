const adminsRoute = [
  {
    path: '/admin/',
    component: () => import('layouts/AdminsLayout.vue'),
    children: [
      { path: 'home', name: 'admin_index', component: () => import('pages/AdminsIndexPage.vue') },
      { path: 'categories', name: 'menu_category', component: () => import('pages/CategoryPage.vue') },
      { path: 'addmenu', name: 'add_menu', component: () => import('pages/AddMenuPage.vue') },
      { path: 'productList', name: 'product_menu', component: () => import('pages/adminPages/productList.vue') },
      { path: 'adminNewOrders', name: 'new_orders', component: () => import('pages/adminPages/adminNewOrders.vue') },
      { path: 'check-out-order/:order_no/:customer_name', name: 'checkout_order', component: () => import('pages/adminPages/adminCheckOutOrder.vue') },
      { path: 'tableList', name: 'table_list', component: () => import('pages/adminPages/adminTables.vue') },
      { path: 'items-category', name: 'items_category', component: () => import('pages/adminPages/adminItemCategory.vue') },
      { path: 'items-list', name: 'items_list', component: () => import('pages/adminPages/adminItemsList.vue') },
    ],
  },
];

export default adminsRoute;
