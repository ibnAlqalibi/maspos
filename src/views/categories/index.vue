<template>
  <!-- Bottom Section -->
  <div
    class="px-2 pt-2 pb-3 space-y-1 md:flex md:items-center md:space-x-4 md:space-y-0 md:mb-3 md:px-0 md:pt-0 md:pb-0"
  >
    <div class="relative">
      <input
        v-model="ProductsStore.search"
        type="text"
        placeholder="Cari nama produk ..."
        class="font-sf w-full md:w-[256px] bg-[#EDF0F2] px-4 py-2 pl-10 rounded-[8px] text-sm focus:outline-none focus:border-blue-500"
        @input="filterProducts"
      />
      <MagnifyingGlassIcon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#2C59E5]"
      />
    </div>

    <ScrollButton @direction="left" class="hidden md:block">
      <font-awesome-icon icon="fa-solid fa-angle-left" class="h-5 w-5" />
    </ScrollButton>

    <div
      ref="categoriesContainer"
      class="flex space-x-[16px] overflow-x-auto noScrollBar"
    >
      <CategoryButton
        name="Semua"
        :isActive="activeCategory === null"
        @click="setActiveCategory(null)"
      />
      <CategoryButton
        v-for="category in CategoriesStore.categories"
        :key="category.id"
        :name="category.name"
        :isActive="activeCategory === category.id"
        @click="setActiveCategory(category.id)"
      />
    </div>

    <ScrollButton @direction="right" class="hidden md:block">
      <font-awesome-icon icon="fa-solid fa-angle-right" class="h-5 w-5" />
    </ScrollButton>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useCategoriesStore } from "@/stores/categories.store";
import { useProductsStore } from "@/stores/products.store";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import CategoryButton from "@/utils/components/buttons/categoryButton.vue";
import ScrollButton from "@/utils/components/buttons/scrollButton.vue";

const CategoriesStore = useCategoriesStore();
const ProductsStore = useProductsStore();
const categoriesContainer = ref(null);
const activeCategory = ref(null);

const setActiveCategory = (id) => {
  activeCategory.value = id;
  CategoriesStore.setCategoryId(id);
};

const filterProducts = () => {
  ProductsStore.filteredProducts = ProductsStore.products.filter((prod) => {
    const matchesCategory =
      !CategoriesStore.category_id ||
      prod.category_id === CategoriesStore.category_id;
    const matchesSearch = prod.name
      .toLowerCase()
      .includes(ProductsStore.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
};

const left = () => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollBy({ left: -200, behavior: "smooth" });
  }
};

const right = () => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollBy({ left: 200, behavior: "smooth" });
  }
};

onMounted(async () => {
  await CategoriesStore.fetch();
  setActiveCategory(CategoriesStore.category_id);

  await ProductsStore.fetch();
  filterProducts();
});

watch(
  () => CategoriesStore.category_id,
  () => {
    filterProducts();
  }
);
</script>

<style scoped>
.noScrollBar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}
.noScrollBar::-webkit-scrollbar {
  display: none;
}
</style>
