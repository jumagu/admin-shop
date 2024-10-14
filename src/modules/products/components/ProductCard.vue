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
    <a href="#">
      <div class="overflow-hidden rounded-xl">
        <img :src="product.images[0]" width="250" height="250" :alt="product.title" />
      </div>

      <div class="mt-1 p-2">
        <h2 class="text-slate-700">{{ product.title }}</h2>
        <p class="mt-1 text-sm text-slate-400 truncate">{{ product.description }}</p>

        <div class="mt-3 flex items-end justify-between">
          <p class="text-lg font-bold text-blue-500">${{ product.price }}</p>

          <div
            class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600"
          >
            <cart-icon class="h-4 w-4" />

            <button class="text-sm">Add to cart</button>
          </div>
        </div>
      </div>
    </a>
  </article>
</template>
