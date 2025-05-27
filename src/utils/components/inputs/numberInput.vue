<template>
  <div>
    <label class="regular block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      type="number"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="regular w-full px-3 py-2 border border-gray-700 bg-[#FCFCFC] rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
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

  emit("update:modelValue", parseInt(value));
};
</script>
