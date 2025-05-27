<template>
  <label
    for="password"
    class="regular text-[12px] block font-bold mb-2 text-gray-700"
    >{{ label }}</label
  >
  <div class="relative">
    <input
      :type="showPassword ? 'text' : 'password'"
      id="password"
      :value="modelValue"
      @input="onInput"
      :class="[
        'regular text-[16px] w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2c59e5]',
        error ? 'border-red-500' : 'border-gray-800',
      ]"
      :placeholder="placeholder"
      required
    />
    <button
      type="button"
      @click="toggleShowPassword"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
    >
      <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
    </button>
  </div>
  <span v-if="error" class="text-red-500 text-sm">
    {{ error }}
  </span>
</template>
<script setup>
import { ref } from "vue";

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
const showPassword = ref(false);

const emit = defineEmits(["update:modelValue"]);

const onInput = (event) => {
  let value = event.target.value;
  emit("update:modelValue", value);
};

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
