<script setup lang="ts">
import type { Product } from '../interfaces/product.interface';
import CartIcon from '@/modules/common/components/icons/CartIcon.vue';

interface Props {
  product: Product;
}

defineProps<Props>();
</script>

<template>
  <article
    class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
  >
    <div class="overflow-hidden rounded-xl w-auto h-[250px]">
      <img
        :src="product.images[0]"
        :alt="product.title"
        class="size-full object-cover object-top"
      />
    </div>

    <div class="mt-1 p-2">
      <h2 class="text-slate-700">{{ product.title }}</h2>
      <p class="mt-1 text-sm text-slate-400 truncate">{{ product.description }}</p>

      <div class="mt-3 flex items-end justify-between">
        <p class="text-lg font-bold text-blue-500">${{ product.price }}</p>

        <button
          class="flex items-center px-4 py-1.5 space-x-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <cart-icon class="h-4 w-4" />
          <span class="text-sm">Add to cart</span>
        </button>
      </div>
    </div>
  </article>
</template>
