<script setup lang="ts">
import { useAuthStore } from './modules/auth/stores/auth.store';
import FullScreenLoader from './modules/common/components/ui/FullScreenLoader.vue';

const authStore = useAuthStore();
</script>

<template>
  <full-screen-loader v-if="authStore.isChecking" />
  <router-view v-else />
</template>
