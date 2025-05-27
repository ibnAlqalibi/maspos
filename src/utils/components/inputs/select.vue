<template>
  <label class="regular block text-sm font-medium text-gray-700 mb-1">{{
    label
  }}</label>
  <select
    @change="onChange"
    id="data-select"
    :value="modelValue"
    class="regular w-full px-3 py-2 border border-gray-800 bg-gray-50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
  >
    <slot />
  </select>
  <p v-if="error" class="text-red-500 text-xs mt-1">
    {{ error }}
  </p>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const onChange = (event) => {
  let value = event.target.value;
  emit("update:modelValue", value);
};
</script>
