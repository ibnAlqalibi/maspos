<template>
  <div class="flex items-center gap-[16px] mt-1.5 sm:mt-2">
    <button
      class="bg-[#E8E8E8] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center"
      @click="onDecrease"
    >
      <MinusIcon class="w-[14px] h-[14px] text-[#0F0F0F]" />
    </button>
    <span class="regular text-[20px] font-[500]">
      {{ modelValue }}
    </span>
    <button
      class="bg-[#E8E8E8] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center"
      @click="onIncrease"
    >
      <PlusIcon class="w-[14px] h-[14px] text-[#0F0F0F]" />
    </button>
  </div>
</template>
<script setup>
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["increase", "decrease"]);

const onIncrease = () => {
  emit("increase");
};

const onDecrease = () => {
  emit("decrease");
};
</script>
