<template>
  <button
    @click="$emit('direction')"
    class="py-2 text-blue-600 rounded-lg text-sm whitespace-nowrap hover:bg-blue-50"
  >
    <slot />
  </button>
</template>
<script setup>
defineEmits(["direction"]);
</script>
