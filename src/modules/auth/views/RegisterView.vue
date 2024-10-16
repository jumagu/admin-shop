<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
const fullNameInputRef = ref<HTMLInputElement>();
const emailInputRef = ref<HTMLInputElement>();
const passwordInputRef = ref<HTMLInputElement>();
const registerForm = reactive({ fullName: '', email: '', password: '' });

const registerHandler = async () => {
  if (registerForm.fullName.trim().length === 0) return fullNameInputRef.value?.focus();
  if (registerForm.email.trim().length === 0) return emailInputRef.value?.focus();
  if (registerForm.password.trim().length === 0) return passwordInputRef.value?.focus();

  await authStore.startRegister(registerForm.fullName, registerForm.email, registerForm.password);
};
</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Resgister</h1>
  <form @submit.prevent="registerHandler">
    <!-- Full Name Input -->
    <div class="mb-4">
      <label for="fullName" class="block text-gray-600">Full name</label>
      <input
        id="fullName"
        ref="fullNameInputRef"
        type="text"
        name="fullName"
        v-model="registerForm.fullName"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Email Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input
        id="email"
        ref="emailInputRef"
        type="email"
        name="email"
        v-model="registerForm.email"
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
        v-model="registerForm.password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off"
      />
    </div>
    <!-- Register Button -->
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
    >
      Create Account
    </button>
  </form>
  <!-- Login  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <router-link :to="{ name: 'login' }" class="hover:underline">Log in here</router-link>
  </div>
</template>
