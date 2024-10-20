<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import SideBar from '../components/SideBar.vue';
import MyFooter from '../components/MyFooter.vue';
</script>

<template>
  <div class="drawer drawer-end md:drawer-open animate__animated animate__fadeIn animate__faster">
    <input id="shop-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <nav-bar />
      <main class="shop-main-container">
        <router-view />
      </main>
      <my-footer />
    </div>

    <div class="drawer-side z-[2]">
      <label for="shop-drawer" aria-label="Close menu" class="drawer-overlay"></label>
      <side-bar />
    </div>
  </div>
</template>

<style lang="css" scoped>
.shop-main-container {
  @apply flex flex-col min-h-[calc(100vh-164px)] md:min-h-[calc(100vh-124px)] lg:min-h-[calc(100vh-88px)];
}
</style>
