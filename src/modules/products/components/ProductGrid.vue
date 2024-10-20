<template>
  <section class="py-10 bg-gray-100" aria-label="Products">
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      aria-label="List of products"
    >
      <slot />
    </div>
  </section>
</template>
