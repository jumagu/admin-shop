<script setup lang="ts">
import { NAV_ITEMS } from '../config/nav-bar.config';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import MenuIcon from '@/modules/common/components/icons/MenuIcon.vue';

const authStore = useAuthStore();
</script>

<template>
  <header class="fixed top-0 left-0 z-[1] w-full border-b border-gray-200 bg-white py-2.5 px-4">
    <nav
      class="container mx-auto flex max-w-6xl flex-wrap items-center justify-between"
      aria-label="Main navigation"
    >
      <div class="basis-0 grow">
        <router-link to="" class="w-fit flex items-center" aria-label="Shop Home">
          <img src="../../../assets/logo.svg" class="mr-2 h-6 sm:h-9" alt="Admin Shop Logo" />
          <span class="text-lg md:text-xl font-semibold">Shop</span>
        </router-link>
      </div>

      <div class="hidden md:block">
        <ul class="flex flex-row p-4 gap-8" role="presentation">
          <li v-for="(navItem, index) in NAV_ITEMS" :key="index">
            <router-link
              :to="navItem.href"
              class="text-sm font-medium text-gray-700 hover:text-black"
            >
              {{ navItem.text }}
            </router-link>
          </li>
        </ul>
      </div>

      <div class="flex basis-0 grow justify-end">
        <div v-if="authStore.isUnauthenticated" class="hidden md:block">
          <router-link
            :to="{ name: 'login' }"
            class="py-1.5 px-6 mr-3 text-center text-sm font-medium text-blue-700 border border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
          >
            Login
          </router-link>
          <router-link
            :to="{ name: 'register' }"
            class="py-1.5 px-6 text-center text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
          >
            Register
          </router-link>
        </div>

        <div v-if="authStore.isAuthenticated" class="hidden md:block">
          <router-link
            v-if="authStore.isAdmin"
            :to="{ name: 'admin' }"
            class="py-1.5 px-6 mr-3 text-center text-sm font-medium text-blue-700 border border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
          >
            Admin
          </router-link>
          <button
            type="button"
            class="py-1.5 px-6 text-center text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
            @click="authStore.startLogout"
          >
            Logout
          </button>
        </div>

        <label
          for="shop-drawer"
          aria-label="Open menu"
          class="block p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg cursor-pointer md:hidden"
        >
          <menu-icon class="h-6 w-6" />
        </label>
      </div>
    </nav>
  </header>
</template>

<style lang="css" scoped>
.router-link-active {
  @apply text-blue-700 font-semibold;
}
</style>
