<template>
  <div>
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      @change="handleFileUpload"
    />

    <div
      v-if="!imagePreview"
      class="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center cursor-pointer"
      @click="triggerFileInput"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
      :class="{ 'border-blue-600 bg-blue-50': isDragging }"
    >
      <div
        class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p class="regular text-sm text-gray-600">
        Seret & Letakkan atau Klik Untuk Unggah
      </p>
      <p class="regular text-xs text-gray-500 mt-1">
        Format yang didukung: jpg, png
      </p>
    </div>

    <div
      v-else
      class="relative border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 text-center cursor-pointer"
      @click="triggerFileInput"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <img
        :src="imagePreview"
        alt="Preview"
        class="max-h-40 mx-auto rounded-lg"
      />
      <p class="regular text-xs text-gray-500 mt-2">
        Klik atau seret dan letakkan file baru untuk mengganti file
      </p>
    </div>

    <p v-if="error" class="text-red-500 text-xs mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";

const emit = defineEmits(["update:modelValue", "update:error"]);
const props = defineProps({
  modelValue: File,
  error: String,
});

const fileInput = ref(null);
const imagePreview = ref(null);
const isDragging = ref(false);
let previewUrl = null;

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  validateAndProcessFile(file);
};

const onDrop = (event) => {
  event.preventDefault();
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  validateAndProcessFile(file);
};

const onDragOver = () => {
  isDragging.value = true;
};

const onDragLeave = () => {
  isDragging.value = false;
};

const validateAndProcessFile = (file) => {
  if (file && ["image/jpeg", "image/png"].includes(file.type)) {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(file);
    imagePreview.value = previewUrl;
    emit("update:modelValue", file);
    emit("update:error", null);
  } else {
    emit("update:error", "Format file harus jpg atau png");
  }
};

watch(
  () => props.modelValue,
  (val) => {
    if (val instanceof File) {
      previewUrl = URL.createObjectURL(val);
      imagePreview.value = previewUrl;
    }
  }
);

onBeforeUnmount(() => {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
});
</script>
