<script setup lang="ts">
import ChevronLeftIcon from '../icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '../icons/ChevronRightIcon.vue';

interface Props {
  page: number;
  noMoreData: boolean;
}

defineProps<Props>();
</script>

<template>
  <div class="flex justify-center gap-2 py-10 bg-gray-100">
    <button
      class="chevron-btn"
      :disabled="page <= 1"
      @click="$router.push({ query: { page: page - 1 } })"
    >
      <chevron-left-icon class="w-7 h-7" />
      <span class="sr-only">previous</span>
    </button>

    <button
      class="chevron-btn"
      :disabled="noMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
    >
      <chevron-right-icon class="w-7 h-7" />
      <span class="sr-only">next</span>
    </button>
  </div>
</template>

<style lang="css" scoped>
.chevron-btn {
  @apply rounded-lg p-1 text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors;
}
</style>
