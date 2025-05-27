<template>
  <div class="max-w-7xl mx-auto pt-6 px-2 3xl:px-[2px]">
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[8px] gap-y-[24px]"
    >
      <div
        v-for="product in ProductsStore.filteredProducts"
        :key="product.id"
        class="bg-white h-[298px] rounded-[16px] border border-[#d6d6d6] overflow-hidden min-w-0"
      >
        <div class="relative w-[200px] h-[177px] p-[8px]">
          <img
            :src="product.picture_url"
            :alt="product.name"
            class="w-full h-full object-cover rounded-[8px]"
          />
          <div class="absolute bottom-[14px] right-[14px] flex gap-1 sm:gap-2">
            <DeleteButton @delete="deleteData(product.id)" />
          </div>
        </div>

        <div class="p-2 sm:p-3">
          <h3 class="regular text-[#0F0F0F] text-xs sm:text-[16px] font-[500]">
            {{ product.name }}
          </h3>
          <p
            class="regular text-[#23A948] font-[700] mt-0.5 sm:mt-1 sm:text-[16px]"
          >
            Rp {{ product.price.toLocaleString() }}
          </p>

          <AddButton
            v-if="!CartStore.cart.find((cart) => cart.id === product.id)"
            class="w-full"
            @click="addToCart(product)"
            label="Keranjang"
          />

          <QtyCounter
            v-else
            v-model="CartStore.cart.find((cart) => cart.id === product.id).qty"
            @decrease="CartStore.updateQty(product.id, 'decrement')"
            @increase="CartStore.updateQty(product.id, 'increment')"
          />
        </div>
      </div>
    </div>
  </div>

  <ConfirmDeleteModal
    :isOpen="showConfirm"
    @close="showConfirm = false"
    @confirm="handleConfirmDelete"
    title="Hapus Produk"
    message="Apakah Anda yakin ingin menghapus produk ini?"
  />
</template>

<script setup>
import { ref } from "vue";
import { useProductsStore } from "@/stores/products.store.js";
import { useCartStore } from "@/stores/cart.store.js";
import ConfirmDeleteModal from "@/utils/components/deleteModal.vue";
import DeleteButton from "@/utils/components/buttons/deleteButton.vue";
import AddButton from "@/utils/components/buttons/addButton.vue";
import QtyCounter from "@/utils/components/qtyCounter.vue";

// Store
const ProductsStore = useProductsStore();
const CartStore = useCartStore();

// State
const showConfirm = ref(false);
const deleteId = ref(null);

// Methods
function addToCart(prod) {
  const cartData = {
    id: prod.id,
    picture_url: prod.picture_url,
    name: prod.name,
    price: prod.price,
    qty: 1,
    subtotal: prod.price,
  };
  CartStore.add(cartData);
}

function deleteData(id) {
  deleteId.value = id;
  showConfirm.value = true;
}

async function handleConfirmDelete() {
  await ProductsStore.delete(deleteId.value);
  showConfirm.value = false;
}
</script>
