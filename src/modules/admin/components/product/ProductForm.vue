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
      v-model.number="price"
      v-bind="priceAttrs"
      :error="errors.price"
    />
    <custom-input
      type="number"
      class="mb-4 flex-1"
      label="Stock"
      v-model.number="stock"
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
      <option value="unisex">Unisex</option>
    </custom-select>

    <div class="mb-4 sm:col-span-2">
      <p class="form-label">Images</p>
      <div
        class="flex items-center overflow-x-auto w-full min-h-[250px] bg-gray-100 rounded border-2 border-gray-500 border-dotted"
      >
        <div v-if="!images.length && !imageFiles.length" class="mx-auto">
          <span class="text-gray-500 text-lg font-semibold select-none">Image Preview</span>
        </div>
        <template v-else>
          <div v-for="image of images" :key="image.value" class="flex-shrink-0">
            <img :src="image.value" :alt="title" class="ml-2 size-[234px] object-cover" />
          </div>
          <div v-for="imgFile of imageFiles" :key="imgFile.name" class="flex-shrink-0">
            <img
              :src="tempImgUrl(imgFile)"
              :alt="imgFile.name"
              class="ml-2 size-[234px] object-cover"
            />
          </div>
        </template>
      </div>
      <div class="my-2">
        <label for="image" class="form-label">Upload Images</label>
        <input
          id="image"
          type="file"
          multiple
          accept="image/*"
          class="form-control"
          @change="fileChangeHandler"
        />
      </div>
    </div>

    <div class="sm:col-span-2">
      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300 disabled:cursor-not-allowed"
        :disabled="isPending"
      >
        {{ product ? 'Update' : 'Create' }}
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
