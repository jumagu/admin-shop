<script setup lang="ts">
import { watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';

import { getProductById } from '@/modules/products/actions';
import ProductForm from '../components/product/ProductForm.vue';

interface Props {
  id: string;
}

const props = defineProps<Props>();

const router = useRouter();

const {
  data: product,
  refetch,
  isError,
  isLoading,
} = useQuery({
  queryKey: ['product', props.id],
  queryFn: () => (props.id !== 'new' ? getProductById(props.id) : null),
  retry: false,
});

watch(
  () => props.id,
  () => {
    refetch();
  },
);

watchEffect(() => {
  if (isError.value && !isLoading.value) return router.replace('/admin/products');
});
</script>

<template>
  <div class="bg-white p-5">
    <h1 class="text-3xl text-blue-500">
      {{ product?.title ? product.title : 'Add a new product' }}
    </h1>
    <hr class="my-4" />
    <product-form :product="product" />
  </div>
</template>
