<script setup lang="ts">
import { useRouter } from 'vue-router';
import { SIDE_NAV_ITEMS } from '../config/side-bar.config';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import MenuIcon from '@/modules/common/components/icons/MenuIcon.vue';
import LogoutIcon from '@/modules/common/components/icons/LogoutIcon.vue';

const router = useRouter();
const authStore = useAuthStore();

const logoutHandler = () => {
  authStore.startLogout();
  router.replace('/');
};
</script>

<template>
  <div class="drawer lg:drawer-open text-gray-700">
    <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="flex flex-col flex-1">
        <header class="sticky top-0 flex items-center h-16 px-6 border-b border-gray-300 bg-white">
          <label
            for="admin-drawer"
            class="p-2 mr-1 w-10 h-10 rounded hover:bg-gray-300 cursor-pointer lg:hidden"
          >
            <menu-icon class="size-auto" />
          </label>
          <button
            class="flex items-center gap-2 ml-auto p-2 w-auto h-10 rounded hover:bg-gray-200"
            @click="logoutHandler"
          >
            <span class="text-blue-500">{{ authStore.user?.fullName }}</span>
            <logout-icon class="size-5" />
          </button>
        </header>

        <main class="p-6 bg-gray-200">
          <router-view />
        </main>
      </div>
    </div>

    <div class="drawer-side z-[2]">
      <label for="admin-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <aside class="h-full w-60 bg-white border-r border-gray-300">
        <div class="flex items-center gap-2 w-full h-16 px-4 border-b border-gray-300">
          <router-link to="/">
            <img class="h-8 w-8" src="../../../assets/logo.svg" alt="Admin Shop Logo" />
          </router-link>
          <h1 class="text-xl font-semibold">Admin Shop</h1>
        </div>

        <nav class="p-4 overflow-auto">
          <ul role="navigation">
            <li v-for="(item, index) in SIDE_NAV_ITEMS" :key="index" role="link">
              <router-link
                :to="item.href"
                active-class="bg-gray-200"
                class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-200"
              >
                <span class="leading-none">{{ item.text }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>
