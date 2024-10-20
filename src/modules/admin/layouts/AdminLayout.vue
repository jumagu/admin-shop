<script setup lang="ts">
import { useRouter } from 'vue-router';
import { SIDE_NAV_ITEMS } from '../config/side-bar.config';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import MenuIcon from '@/modules/common/components/icons/MenuIcon.vue';
import LogoutIcon from '@/modules/common/components/icons/LogoutIcon.vue';

const router = useRouter();
const authStore = useAuthStore();

const clickItemHanlder = () => {
  const drawer = document.getElementById('admin-drawer') as HTMLInputElement;
  if (!!drawer) drawer.checked = false;
};

const logoutHandler = () => {
  authStore.startLogout();
  router.replace('/');
};
</script>

<template>
  <div
    class="drawer lg:drawer-open text-gray-700 animate__animated animate__fadeIn animate__faster"
  >
    <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="flex flex-col flex-1">
        <header class="sticky top-0 flex items-center h-16 px-6 border-b border-gray-300 bg-white">
          <label
            for="admin-drawer"
            aria-label="Open navigation sidebar"
            class="p-2 mr-1 w-10 h-10 rounded hover:bg-gray-300 cursor-pointer lg:hidden"
          >
            <menu-icon class="size-auto" />
          </label>
          <button
            class="flex items-center gap-2 ml-auto p-2 w-auto h-10 rounded hover:bg-gray-100"
            @click="logoutHandler"
          >
            <span class="text-blue-500">{{ authStore.user?.fullName }}</span>
            <logout-icon class="size-5 stroke-blue-500" />
          </button>
        </header>

        <main class="p-6 bg-gray-200">
          <router-view />
        </main>
      </div>
    </div>

    <div class="drawer-side z-[2]">
      <label
        for="admin-drawer"
        aria-label="Close navigation sidebar"
        class="drawer-overlay"
      ></label>
      <aside class="h-full w-60 bg-white border-r border-gray-300">
        <div class="flex items-center gap-2 w-full h-16 px-4 border-b border-gray-300">
          <router-link to="/">
            <img class="h-8 w-8" src="../../../assets/logo.svg" alt="Admin Shop Logo" />
          </router-link>
          <h1 class="text-xl font-semibold">Admin Shop</h1>
        </div>

        <nav class="p-4 overflow-auto" aria-label="List of admin navigation options">
          <ul role="presentation">
            <li v-for="(item, index) in SIDE_NAV_ITEMS" :key="index" @click="clickItemHanlder">
              <router-link
                :to="item.href"
                active-class="bg-gray-100"
                class="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-100"
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
