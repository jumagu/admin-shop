import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useLocalStorage } from '@vueuse/core';

import { AuthStatus } from '../enums';
import type { User } from '../interfaces';
import { checkAuth, login, register } from '../actions';

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast();
  const router = useRouter();

  const user = ref<User>();
  const token = useLocalStorage('token', '');
  const status = ref<AuthStatus>(AuthStatus.Checking);

  const startLogin = async (email: string, password: string) => {
    status.value = AuthStatus.Checking;

    try {
      const loginData = await login(email, password);

      user.value = loginData.user;
      token.value = loginData.token;
      status.value = AuthStatus.Authenticated;

      router.replace({ name: 'home' });
      toast.success('Log in successfully.');
    } catch (error) {
      startLogout();
      toast.error((error as Error).message);
    }
  };

  const startRegister = async (fullName: string, email: string, password: string) => {
    status.value = AuthStatus.Checking;

    try {
      const registerData = await register(fullName, email, password);

      user.value = registerData.user;
      token.value = registerData.token;
      status.value = AuthStatus.Authenticated;

      router.replace({ name: 'home' });
      toast.success('Your account has been successfully created.');
    } catch (error) {
      startLogout();
      toast.error((error as Error).message);
    }
  };

  const startLogout = () => {
    user.value = undefined;
    token.value = undefined;
    status.value = AuthStatus.Unauthenticated;
  };

  const startCheckAuth = async () => {
    try {
      const checkAuthData = await checkAuth();

      if (!checkAuthData) {
        startLogout();
        return;
      }

      user.value = checkAuthData.user;
      token.value = checkAuthData.token;
      status.value = AuthStatus.Authenticated;
    } catch (error) {
      startLogout();
      toast.error((error as Error).message);
    }
  };

  return {
    // Properties
    user,
    token,
    status,

    // Getters
    isAdmin: computed(() => user.value?.roles.includes('admin')),
    isChecking: computed(() => status.value === AuthStatus.Checking),
    isAuthenticated: computed(() => status.value === AuthStatus.Authenticated),
    isUnauthenticated: computed(() => status.value === AuthStatus.Unauthenticated),

    // Actions
    startLogin,
    startLogout,
    startRegister,
    startCheckAuth,
  };
});
