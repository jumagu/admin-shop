<script setup lang="ts">
import { onMounted } from 'vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

import { useAuthStore } from './modules/auth/stores/auth.store';
import FullScreenLoader from './modules/common/components/ui/FullScreenLoader.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.startCheckAuth();
});
</script>

<template>
  <full-screen-loader v-if="authStore.isChecking" />
  <router-view v-else />
  <vue-query-devtools />
</template>
