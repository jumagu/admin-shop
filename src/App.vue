<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

import { AuthStatus } from './modules/auth/enums';
import { useAuthStore } from './modules/auth/stores/auth.store';
import FullScreenLoader from './modules/common/components/ui/FullScreenLoader.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.startCheckAuth();
});

watch(
  () => authStore.status,
  (status) => {
    if (route.path.includes('/auth') && status === AuthStatus.Authenticated)
      router.replace({ name: 'home' });
  },
);
</script>

<template>
  <full-screen-loader v-if="authStore.isChecking" />
  <router-view v-else />
  <vue-query-devtools />
</template>
