<template>
  <div class="w-full flex justify-center bg-[#ecf0f2] py-12">
    <div class="w-full max-w-md bg-white rounded-[16px] shadow overflow-hidden">
      <div class="w-full bg-[#F5F5F5] p-[24px]">
        <span class="regular text-[20px] font-[500]">Tambah Kategori</span>
      </div>

      <form action="" @submit.prevent="create">
        <div class="p-[24px]">
          <TextInput
            v-model="formData.name"
            :error="errors.name"
            label="Nama Kategori"
            placeholder="Masukkan nama kategori"
          />
        </div>

        <div class="flex space-x-4 border-t border-gray-200 p-[24px]">
          <OutlinedPrimaryButton
            type="button"
            @click="$router.push('/')"
            label="Batal"
          />
          <PrimaryButton type="submit" label="Tambah" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCategoriesStore } from "@/stores/categories.store.js";
import { toast } from "vue3-toastify";
import TextInput from "@/utils/components/inputs/textInput.vue";
import OutlinedPrimaryButton from "@/utils/components/buttons/outlinedPrimaryButton.vue";
import PrimaryButton from "@/utils/components/buttons/primaryButton.vue";

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
