<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { ref, watch, watchEffect } from 'vue';

import { useQuery, useQueryClient } from '@tanstack/vue-query';

import TabMenu from '../components/TabMenu.vue';
import { getProducts } from '@/modules/products/actions';
import ProductCard from '@/modules/products/components/ProductCard.vue';
import ProductGrid from '@/modules/products/components/ProductGrid.vue';
import MyPagination from '@/modules/common/components/ui/MyPagination.vue';
import { getPageNumber } from '@/modules/common/utils/get-page-number.util';

const route = useRoute();
const toast = useToast();
const queryClient = useQueryClient();
const page = ref(getPageNumber(route.query.page as string));

const { data: products, error } = useQuery({
  queryKey: ['products', { page }], // Caches the response
  queryFn: () => getProducts(page.value),
});

watch(error, (error) => {
  return error?.message && toast.error(error?.message);
});

watch(
  () => route.query.page,
  (newPage) => {
    page.value = getPageNumber(newPage as string);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
);

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
  <div class="pt-32 bg-white">
    <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
  </div>

  <tab-menu />

  <product-grid v-if="products && products.length > 0">
    <product-card v-for="product in products" :product="product" :key="product.id" />
  </product-grid>

  <div v-else class="py-10">
    <p class="mx-2 text-center text-xl">There are no results for this page.</p>
  </div>

  <my-pagination :page="page" :no-more-data="!!products && products.length < 10" />
</template>
