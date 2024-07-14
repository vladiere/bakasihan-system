import { RouteRecordRaw } from 'vue-router';
import usersRoute from './users.route';
import adminsRoute from './admin.route';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
  ...usersRoute,
  ...adminsRoute,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },

];

export default routes;
