<template>
  <div
    class="bg-gray-100 flex justify-center items-center h-screen animate__animated animate__fadeIn animate__faster"
  >
    <div class="w-1/2 h-screen hidden lg:block">
      <div class="triangle-pattern w-full h-full" />
    </div>

    <main class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <div class="mx-auto max-w-96">
        <router-view />
      </div>
    </main>
  </div>
</template>
