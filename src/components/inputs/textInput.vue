<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      :class="[
        'w-full px-3 py-2 border rounded-md bg-[#F5F5F5] focus:outline-none focus:ring-1 focus:ring-blue-500',
        error ? 'border-red-500' : 'border-gray-800',
      ]"
    />
    <span v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
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
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (event) => {
  let value = event.target.value;
  emit("update:modelValue", value);
};
</script>
