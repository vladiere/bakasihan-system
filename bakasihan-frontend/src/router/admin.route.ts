const adminsRoute = [
  {
    path: '/admin/',
    component: () => import('layouts/AdminsLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'home', name: 'admin_index', component: () => import('pages/AdminsIndexPage.vue'), meta: { requiresAuth: true }  },
      { path: 'categories', name: 'menu_category', component: () => import('pages/CategoryPage.vue'), meta: { requiresAuth: true }  },
      { path: 'addmenu', name: 'add_menu', component: () => import('pages/AddMenuPage.vue'), meta: { requiresAuth: true }  },
      { path: 'productList', name: 'product_menu', component: () => import('pages/adminPages/productList.vue') , meta: { requiresAuth: true } },
      { path: 'adminNewOrders', name: 'new_orders', component: () => import('pages/adminPages/adminNewOrders.vue'), meta: { requiresAuth: true }  },
      { path: 'check-out-order/:order_no/:customer_name', name: 'checkout_order', component: () => import('pages/adminPages/adminCheckOutOrder.vue'), meta: { requiresAuth: true }  },
      { path: 'tableList', name: 'table_list', component: () => import('pages/adminPages/adminTables.vue'), meta: { requiresAuth: true }  },
      { path: 'items-category', name: 'items_category', component: () => import('pages/adminPages/adminItemCategory.vue'), meta: { requiresAuth: true }  },
      { path: 'items-list', name: 'items_list', component: () => import('pages/adminPages/adminItemsList.vue') , meta: { requiresAuth: true } },
      { path: 'order-history', name: 'order_history', component: () => import('pages/adminPages/adminOrderHistory.vue'), meta: { requiresAuth: true }  },
      { path: 'admin-list', name: 'admin_list', component: () => import('pages/adminPages/adminList.vue'), meta: { requiresAuth: true }  },
      { path: 'admin-settings', name: 'admin_settings', component: () => import('pages/adminPages/adminSettings.vue'), meta: { requiresAuth: true }  },
    ],
  },
];

export default adminsRoute;
