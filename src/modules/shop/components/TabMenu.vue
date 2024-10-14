<script setup lang="ts">
import TagIcon from '@/modules/common/components/icons/TagIcon.vue';
import BookIcon from '@/modules/common/components/icons/BookIcon.vue';
import StarIcon from '@/modules/common/components/icons/StarIcon.vue';
import CompassIcon from '@/modules/common/components/icons/CompassIcon.vue';
</script>

<template>
  <div class="flex flex-wrap items-center justify-center overflow-x-auto overflow-y-hidden py-10">
    <a
      href="#"
      rel="noopener noreferrer"
      class="flex items-center flex-shrink-0 px-5 py-3 gap-2 text-gray-600"
    >
      <tag-icon class="w-4 h-4" />
      <span>Featured</span>
    </a>

    <a
      href="#"
      rel="noopener noreferrer"
      class="flex items-center flex-shrink-0 px-5 py-3 gap-2 text-gray-600"
    >
      <book-icon class="w-4 h-4" />
      <span>Catalog</span>
    </a>

    <a
      href="#"
      rel="noopener noreferrer"
      class="flex items-center flex-shrink-0 px-5 py-3 gap-2 text-gray-600"
    >
      <star-icon class="w-4 h-4" />
      <span>Starred</span>
    </a>

    <a
      href="#"
      rel="noopener noreferrer"
      class="flex items-center flex-shrink-0 px-5 py-3 gap-2 text-gray-600"
    >
      <compass-icon class="w-4 h-4" />
      <span>Locations</span>
    </a>
  </div>
</template>
