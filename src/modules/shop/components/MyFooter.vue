<script setup lang="ts">
import XIcon from '@/modules/common/components/icons/XIcon.vue';
import MailIcon from '@/modules/common/components/icons/MailIcon.vue';
import GitHubIcon from '@/modules/common/components/icons/GitHubIcon.vue';
</script>

<template>
  <footer class="py-6 bg-gray-200 text-gray-900">
    <div
      class="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50"
    >
      <div class="grid justify-center lg:justify-between">
        <div
          class="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6"
        >
          <span>Copyright © {{ new Date().getFullYear() }} by AdminShop</span>
          <a rel="noopener noreferrer" href="#">
            <span>Privacy policy</span>
          </a>
          <a rel="noopener noreferrer" href="#">
            <span>Terms of service</span>
          </a>
        </div>
        <div class="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
          <a
            rel="noopener noreferrer"
            href="mailto:email@example.com"
            title="Email"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 duration-150 text-gray-50"
          >
            <mail-icon class="w-5 h-5" />
          </a>

          <a
            title="Twitter - X"
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 duration-150 text-gray-50"
          >
            <x-icon class="w-5 h-5" />
          </a>

          <a
            title="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/jumagu/admin-shop"
            class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 duration-150 text-gray-50"
          >
            <git-hub-icon class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
