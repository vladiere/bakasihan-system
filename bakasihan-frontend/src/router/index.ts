import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';
import routes from './routes';

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    authStore.getAccessToken()
    authStore.getUserAuth()
    const auth = authStore.user;
    const isAuth = authStore.accessToken;
    console.log(auth)

    // Check if authentication is required for the route
    if (to.meta.requiresAuth) {
      // If the user is not authenticated (either no user or no access token), redirect to login
      if (!auth || !isAuth) {
        next('/login'); // Redirect to login page
      } else if (auth && !to.path.startsWith('/admin')) {
        // If user is authenticated and not already on /admin, redirect to /admin
        next('/admin/home');
      } else {
        next(); // Proceed to the requested route
      }
    } else {
      next(); // If authentication is not required, proceed to the requested route
    }
  });


  return Router;
});
