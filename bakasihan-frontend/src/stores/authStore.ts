import { defineStore } from 'pinia';
import { userAuthT } from 'src/components/models';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth',()=>{
  const accessToken = ref<string>('');
  const refreshToken = ref<string>('');

  const user = ref<userAuthT | null>({
    username:'',
    role:''
  })
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('User');
  };
  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
  };
  const getAccessToken = () => {
    accessToken.value = localStorage.getItem('accessToken') || '';
  };
  const setRefreshToken = (token: string) => {
    localStorage.setItem('refreshToken', token);
  };
  const getRefreshToken = () => {
    refreshToken.value = localStorage.getItem('refreshToken') || '';
  };
  const setUserAuth = (data: string) => {
    localStorage.setItem('User', data);
  };
  const getUserAuth = () => {
    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      user.value = JSON.parse(storedUser);
    } else {
      user.value = null;
    }
  };
  return {
    user,
    accessToken,
    refreshToken,
    getAccessToken,
    getRefreshToken,
    getUserAuth,
    setAccessToken,
    setRefreshToken,
    setUserAuth,
    logout
  }
})
