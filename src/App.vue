<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <router-view />
  <vue-query-devtools />
</template>
