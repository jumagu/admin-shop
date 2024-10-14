<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import MyFooter from '../components/MyFooter.vue';
</script>

<template>
  <nav-bar />

  <div>
    <router-view />
  </div>

  <my-footer />
</template>
