<template>
  <button
    class="regular w-full h-[39px] mt-1.5 sm:mt-[12px] sm:mb-[8px] bg-[#2C59E5] text-[#F5F5F5] px-2 sm:px-3 rounded-[8px] flex items-center justify-center gap-1"
    @click="$emit('click')"
    :type="type"
  >
    <PlusIcon class="w-[16px] h-[16px] text-white" />
    <span class="text-[16px]">{{ label }}</span>
  </button>
</template>
<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
defineProps({ label: String, type: String });
defineEmits(["click"]);
</script>
