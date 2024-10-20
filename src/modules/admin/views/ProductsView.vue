<script setup lang="ts">
import { watch, watchEffect } from 'vue';
import { useToast } from 'vue-toastification';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

import { getProducts } from '@/modules/products/actions';
import MyPagination from '@/modules/common/components/ui/MyPagination.vue';
import { usePagination } from '@/modules/common/composables/usePagination';

const toast = useToast();
const { page } = usePagination();
const queryClient = useQueryClient();

const {
  data: products,
  error,
  isLoading,
} = useQuery({
  queryKey: ['products', { page }],
  queryFn: () => getProducts(page.value),
});

watch(error, (error) => {
  return error?.message && toast.error(error.message);
});

watchEffect(() => {
  queryClient.prefetchQuery({
    queryKey: ['products', { page: page.value + 1 }],
    queryFn: () => getProducts(page.value + 1),
    staleTime: 1000 * 60,
  });

  if (page.value > 1) {
    queryClient.prefetchQuery({
      queryKey: ['products', { page: page.value - 1 }],
      queryFn: () => getProducts(page.value - 1),
      staleTime: 1000 * 60,
    });
  }
});
</script>

<template>
  <div class="w-full">
    <div class="flex mb-2">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-auto rounded"
        @click="$router.push('product/new')"
      >
        Add new
      </button>
    </div>

    <div class="overflow-auto">
      <table class="w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Image</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Sizes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="isLoading">
            <td colspan="4" class="py-10">
              <div class="w-full flex">
                <span
                  class="loading loading-spinner loading-lg text-blue-500 mx-auto"
                  aria-label="loading"
                ></span>
              </div>
            </td>
          </tr>
          <tr
            v-else-if="products && products.length > 0"
            v-for="(product, index) in products"
            :class="{ 'bg-gray-100': index % 2 === 0 }"
            :key="product.id"
          >
            <td class="py-3 px-4 min-w-24">
              <img class="w-11 h-11" :src="product.images[0]" :alt="product.title" />
            </td>
            <td class="py-3 px-4 min-w-[420px]">
              <router-link
                :to="`product/${product.id}`"
                class="hover:underline hover:text-blue-500"
              >
                {{ product.title }}
              </router-link>
            </td>
            <td class="py-3 px-4 min-w-20">${{ product.price }}</td>
            <td class="py-3 px-4 min-w-52">{{ product.sizes.join(', ') }}</td>
          </tr>
          <tr v-else>
            <td colspan="4" class="py-10">
              <div class="w-full flex">
                <span class="w-full mx-2 text-center text-xl"
                  >There are no results for this page.</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <my-pagination class="py-8" :page="page" :no-more-data="!!products && products.length < 10" />
  </div>
</template>
