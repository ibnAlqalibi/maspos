<template>
  <label class="block text-sm font-medium text-gray-700 mb-1">{{
    label
  }}</label>
  <input
    v-model="formData.name"
    :class="[
      'w-full px-3 py-2 border rounded-md bg-[#F5F5F5] focus:outline-none focus:ring-1 focus:ring-blue-500',
      errors.name ? 'border-red-500' : 'border-gray-800',
    ]"
    :placeholder="placeholder"
  />
  <span v-if="errors.name" class="text-red-500 text-sm">
    {{ errors.name }}
  </span>
</template>
<script setup>
defineProps({
  formData: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
  label: String,
  placeholder: String,
});
</script>
