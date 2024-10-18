<script lang="ts" src="./ProductForm.ts" />

<template>
  <form class="grid grid-cols-1 sm:grid-cols-2 gap-x-4" @submit="submitHandler">
    <custom-input
      class="mb-4"
      label="Title"
      v-model="title"
      v-bind="titleAttrs"
      :error="errors.title"
    />

    <custom-input
      class="mb-4"
      label="Slug"
      v-model="slug"
      v-bind="slugAttrs"
      :error="errors.slug"
    />

    <custom-input
      type="number"
      class="mb-4 flex-1"
      label="Price"
      v-model="price"
      v-bind="priceAttrs"
      :error="errors.price"
    />
    <custom-input
      type="number"
      class="mb-4 flex-1"
      label="Stock"
      v-model="stock"
      v-bind="stockAttrs"
      :error="errors.stock"
    />

    <custom-textarea
      class="mb-4 sm:col-span-2"
      label="Description"
      v-model="description"
      v-bind="descriptionAttrs"
      :error="errors.description"
    />

    <div class="mb-4 sm:col-span-2">
      <label for="sizes" class="form-label">Sizes</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="size in allSizes"
          :key="size"
          type="button"
          :class="[
            'p-2 rounded w-14 flex-grow',
            {
              'bg-blue-100': !hasSize(size),
              'bg-blue-500 text-white': hasSize(size),
            },
          ]"
          @click="selectSizeHandler(size)"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <custom-select
      class="mb-4 sm:col-span-2"
      label="Gender"
      v-model="gender"
      v-bind="genderAttrs"
      :error="errors.gender"
    >
      <option value="" disabled>Select</option>
      <option value="men">Hombre</option>
      <option value="women">Mujer</option>
      <option value="kid">Niño</option>
    </custom-select>

    <div class="mb-4 sm:col-span-2">
      <p class="form-label">Images</p>
      <div class="flex gap-2 overflow-x-auto w-full h-[265px]">
        <div v-for="image of images" :key="image.value" class="flex-shrink-0">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px]" />
        </div>
      </div>
      <div class="my-2">
        <label for="image" class="form-label">Upload Images</label>
        <input multiple type="file" id="image" class="form-control" />
      </div>
    </div>

    <div class="sm:col-span-2">
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
    </div>
  </form>
</template>

<style lang="css" scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
