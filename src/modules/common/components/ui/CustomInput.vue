<script setup lang="ts">
import { useId } from 'vue';

export interface Props {
  type?: 'text' | 'number';
  label?: string;
  error?: string;
  modelValue?: string | number;
  placeholder?: string;
}

const id = useId();
const errorId = `${id}-error`;

withDefaults(defineProps<Props>(), { type: 'text' });
defineEmits(['update:modelValue', 'blur']);
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :class="['form-control', { 'border-red-500': error }]"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      :aria-describedby="errorId"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>
