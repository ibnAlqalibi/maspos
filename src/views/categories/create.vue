<template>
  <div class="w-full flex justify-center bg-[#ecf0f2] py-12">
    <div class="w-full max-w-md bg-white rounded-[16px] shadow overflow-hidden">
      <div class="w-full bg-[#F5F5F5] p-[24px]">
        <span class="regular text-[20px] font-[500]">Tambah Kategori</span>
      </div>

      <form action="" @submit.prevent="create">
        <div class="p-[24px]">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Nama Kategori</label
          >
          <input
            v-model="formData.name"
            :class="[
              'w-full px-3 py-2 border rounded-md bg-[#F5F5F5] focus:outline-none focus:ring-1 focus:ring-blue-500',
              errors.name ? 'border-red-500' : 'border-gray-800',
            ]"
            placeholder="Nama Kategori"
          />
          <span v-if="errors.name" class="text-red-500 text-sm">
            {{ errors.name }}
          </span>
        </div>

        <div class="flex space-x-4 border-t border-gray-200 p-[24px]">
          <button
            type="button"
            @click="$router.push('/')"
            class="flex-1 px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCategoriesStore } from "@/stores/categories.store.js";
import { toast } from "vue3-toastify";

// Store dan Router
const categoriesStore = useCategoriesStore();

// Data Form & Error
const resetForm = () => {
  formData.value.name = null;
  errors.value.name = null;
};

const formData = ref({
  name: null,
});
const errors = ref({
  name: null,
});

// Ambil data kategori saat mount
onMounted(() => {
  categoriesStore.fetch();
});

// Cek duplikat nama kategori
const isNameDuplicate = computed(() => {
  return categoriesStore.categories.some(
    (cat) => cat.name?.toLowerCase() === formData.value.name?.toLowerCase()
  );
});

// Fungsi submit
const create = async () => {
  errors.value.name = null;

  if (!formData.value.name) {
    errors.value.name = "Nama Kategori Wajib Diisi.";
    return;
  }

  if (isNameDuplicate.value) {
    errors.value.name = "Nama Kategori Sudah ada.";
    toast("Nama Kategori Sudah ada.", {
      autoClose: 2000,
      type: "error",
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }

  const success = await categoriesStore.add(formData.value);
  if (success) {
    toast("Kategori Berhasil Ditambahkan", {
      autoClose: 2000,
      type: "success",
      position: toast.POSITION.TOP_RIGHT,
    });
    resetForm();
  } else {
    errors.value.name = "Gagal menambahkan kategori.";
    toast("Gagal menambahkan kategori.", {
      autoClose: 2000,
      type: "error",
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
</script>
