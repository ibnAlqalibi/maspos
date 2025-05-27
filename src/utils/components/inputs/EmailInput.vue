<template>
  <label
    for="email"
    class="regular text-[12px] block font-bold mb-2 text-gray-700"
    >{{ label }}</label
  >
  <input
    id="email"
    :value="modelValue"
    @input="onInput"
    type="email"
    class="regular text-[16px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2c59e5]"
    :placeholder="placeholder"
    required
  />
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
