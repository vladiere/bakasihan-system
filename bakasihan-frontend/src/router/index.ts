import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/MainViewLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../layouts/MainLayout.vue'),
          children: [
            {
              path: '',
              name: 'home',
              component: () => import('../views/HomeView.vue'),
            },
            {
              path: '/:category',
              name: 'home_category',
              component: () => import('../views/HomeView.vue'),
            },
          ]
        },
        {
          path: '/orders',
          component: () => import('../views/OrdersView.vue')
        },
        {
          path: '/sales',
          component: () => import('../views/CreditSalesView.vue')
        },
        {
          path: '/customers',
          component: () => import('../views/CustomersView.vue')
        },
        {
          path: '/settings',
          component: () => import('../views/SettingsView.vue')
        },
        {
          path: '/profile',
          component: () => import('../views/ProfileView.vue')
        },
      ]
    },
    {
      path: '/auth',
      component: () => import('../layouts/OutsideLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/LoginView.vue')
        }
      ]
    },

    // This will catch all the unknown routes inputed
    {
      path: '/:catchAll(.*)*',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
