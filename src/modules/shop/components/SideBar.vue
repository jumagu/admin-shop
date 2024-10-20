<script setup lang="ts">
import { NAV_ITEMS } from '../config/nav-bar.config';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import CloseIcon from '@/modules/common/components/icons/CloseIcon.vue';

const authStore = useAuthStore();

const clickItemHanlder = () => {
  const drawer = document.getElementById('shop-drawer') as HTMLInputElement;
  if (!!drawer) drawer.checked = false;
};
</script>

<template>
  <aside class="h-full w-60 px-4 bg-white md:hidden overflow-auto">
    <nav class="mb-4">
      <div class="flex py-4">
        <label
          for="shop-drawer"
          aria-label="Close menu"
          class="ml-auto p-1 hover:bg-gray-100 rounded-lg cursor-pointer"
        >
          <close-icon class="size-5" />
        </label>
      </div>

      <ul class="flex flex-col gap-2" role="presentation">
        <li v-for="(navItem, index) in NAV_ITEMS" :key="index" @click="clickItemHanlder">
          <router-link
            :to="navItem.href"
            class="block w-full py-2 px-2 text-sm font-medium rounded-lg hover:bg-gray-100"
          >
            {{ navItem.text }}
          </router-link>
        </li>
      </ul>

      <hr class="my-4" />

      <div v-if="authStore.isUnauthenticated" class="flex flex-col gap-2">
        <router-link
          :to="{ name: 'login' }"
          class="p-1.5 text-center text-sm font-medium text-blue-700 border border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'register' }"
          class="p-1.5 text-center text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
        >
          Register
        </router-link>
      </div>

      <div v-if="authStore.isAuthenticated" class="flex flex-col gap-2">
        <router-link
          v-if="authStore.isAdmin"
          :to="{ name: 'admin' }"
          class="p-1.5 text-center text-sm font-medium text-blue-700 border border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
        >
          Admin
        </router-link>
        <button
          type="button"
          class="p-1.5 text-center text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
          @click="authStore.startLogout"
        >
          Logout
        </button>
      </div>
    </nav>
  </aside>
</template>

<style lang="css" scoped>
.router-link-active {
  @apply bg-blue-100;
}
</style>
