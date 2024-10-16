<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
const emailInputRef = ref<HTMLInputElement>();
const passwordInputRef = ref<HTMLInputElement>();
const loginForm = reactive({ email: '', password: '', rememberMe: false });

const loginHandler = async () => {
  if (loginForm.email.trim().length === 0) return emailInputRef.value?.focus();
  if (loginForm.password.trim().length === 0) return passwordInputRef.value?.focus();

  if (loginForm.rememberMe) {
    localStorage.setItem('email', loginForm.email);
  } else {
    localStorage.removeItem('email');
  }

  await authStore.startLogin(loginForm.email, loginForm.password);
};

watchEffect(() => {
  const email = localStorage.getItem('email');
  if (email) {
    loginForm.email = email;
    loginForm.rememberMe = true;
  }
});
</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="loginHandler">
    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        id="email"
        ref="emailInputRef"
        type="email"
        name="email"
        v-model="loginForm.email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input
        id="password"
        ref="passwordInputRef"
        type="password"
        name="password"
        v-model="loginForm.password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input
        id="remember"
        type="checkbox"
        name="remember"
        v-model="loginForm.rememberMe"
        class="text-blue-500"
      />
      <label for="remember" class="text-gray-600 ml-2 select-none">Remember Me</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <router-link to="" class="hover:underline">Forgot Password?</router-link>
    </div>
    <!-- Login Button -->
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Login
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <router-link :to="{ name: 'register' }" class="hover:underline">Sign up here</router-link>
  </div>
</template>
