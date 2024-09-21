import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from 'src/stores/authStore';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api = axios.create({ baseURL: 'http://localhost:4000/api' });

export default boot(({ app }) => {
  // Initialize authStore inside the boot function
  const authStore = useAuthStore();

  // Request interceptor to add access token to headers
  api.interceptors.request.use(
    async (config) => {
      // Await fetching the access token
      await authStore.getAccessToken(); // Ensure the token is fetched properly
      const token = authStore.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token refresh on 401 errors
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops

        try {
          // Await fetching the refresh token
          await authStore.getRefreshToken();
          const refreshToken = authStore.refreshToken;
          if (!refreshToken) {
            throw new Error('No refresh token available.');
          }

          // Call API to refresh token
          const refreshResponse = await axios.post('http://localhost:4000/api/auth/refresh-token', { refreshToken });

          // Update the access token and user data in the store
          const newAccessToken = refreshResponse.data.accessToken;
          const newUserResult = refreshResponse.data.user;
          authStore.setAccessToken(newAccessToken);
          authStore.setUserAuth(JSON.stringify(newUserResult));

          // Update the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request with the new token
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // Handle the case where token refresh fails, possibly redirect to login
        }
      }

      return Promise.reject(error);
    }
  );

  // Set axios and api globally for use in Vue components
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
