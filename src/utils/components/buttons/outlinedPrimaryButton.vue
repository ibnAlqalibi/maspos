<template>
  <button
    :type="type"
    @click="$emit('click')"
    class="flex-1 px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none"
  >
    {{ label }}
  </button>
</template>
<script setup>
defineProps({ label: String, type: String });
defineEmits(["click"]);
</script>
