<script setup lang="ts">
import { useId } from 'vue';

export interface Props {
  label?: string;
  error?: string;
  modelValue?: string | number;
  placeholder?: string;
}

const id = useId();
const errorId = `${id}-error`;

defineProps<Props>();
defineEmits(['update:modelValue', 'blur']);
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      :class="['custom-textarea', { 'border-red-500': error }]"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      :aria-describedby="errorId"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @blur="$emit('blur')"
    />
    <span v-if="error" :id="errorId" role="alert" aria-live="assertive" class="text-red-500">
      {{ error }}
    </span>
  </div>
</template>

<style lang="css" scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.custom-textarea {
  @apply shadow h-32 max-h-64 min-h-10 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
