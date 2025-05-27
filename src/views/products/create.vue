<template>
  <div class="min-h-screen w-full flex justify-center bg-[#ecf0f2] py-12">
    <div class="w-full max-w-md bg-white rounded-[16px] shadow overflow-hidden">
      <div class="w-full bg-[#F5F5F5] p-[24px]">
        <h2 class="regular text-[20px] font-[500]">Tambah Produk</h2>
      </div>
      <form action="" @submit.prevent="create">
        <div class="p-[24px]">
          <ImageUpload
            v-model="formData.picture"
            :error="errors.picture"
            @update:error="errors.picture = $event"
          />
          <div class="space-y-4">
            <TextInput
              v-model="formData.name"
              :error="errors.name"
              label="Nama produk"
              placeholder="Masukkan nama produk"
            />

            <NumberInput
              v-model="formData.price"
              :error="errors.price"
              label="Harga produk"
              placeholder="0"
            />

            <Select
              v-model="formData.category_id"
              :error="errors.category_id"
              label="Pilih Kategori"
            >
              <option class="regular" value="" disabled selected>
                Pilih kategori
              </option>
              <option
                class="regular"
                v-for="cat in categoriesStore.categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </Select>
          </div>
        </div>
        <div class="flex space-x-4 p-[24px] border-t border-px border-gray-200">
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products.store.js";
import { useCategoriesStore } from "@/stores/categories.store.js";
import ImageUpload from "@/utils/components/inputs/imageUpload.vue";
import TextInput from "@/utils/components/inputs/textInput.vue";
import NumberInput from "@/utils/components/inputs/numberInput.vue";
import Select from "@/utils/components/inputs/select.vue";
import OutlinedPrimaryButton from "@/utils/components/buttons/outlinedPrimaryButton.vue";
import PrimaryButton from "@/utils/components/buttons/primaryButton.vue";

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const router = useRouter();

const formData = ref({
  category_id: null,
  name: null,
  price: null,
  picture: null,
});
const errors = ref({});

onMounted(() => {
  categoriesStore.fetch();
});

const create = async () => {
  if (!validate()) return;

  const form = new FormData();
  form.append("category_id", formData.value.category_id);
  form.append("name", formData.value.name);
  form.append("price", formData.value.price);

  if (formData.value.picture) {
    form.append("picture", formData.value.picture);
  }

  const result = await productsStore.add(form);
  if (result) {
    router.push("/");
  }
};

const validate = () => {
  errors.value = {};

  if (!formData.value.name) {
    errors.value.name = "Nama produk wajib diisi";
  }

  if (!formData.value.price) {
    errors.value.price = "Harga produk wajib diisi";
  } else if (formData.value.price < 1) {
    errors.value.price = "Harga produk minimal 1";
  }

  if (!formData.value.category_id) {
    errors.value.category_id = "Kategori produk wajib dipilih";
  }

  if (!formData.value.picture) {
    errors.value.picture = "Gambar produk wajib diunggah";
  }

  return Object.keys(errors.value).length === 0;
};
</script>
