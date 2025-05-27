<template>
  <div class="max-w-7xl mx-auto pt-6 px-2 pb-[32px]">
    <div class="rounded-lg border bg-white overflow-hidden">
      <table class="min-w-full text-sm text-left text-gray-500">
        <thead class="regular text-[16px] text-[#0F0F0F] bg-white border-b">
          <tr>
            <th class="px-6 py-3 font-[400]">Produk</th>
            <th class="px-6 py-3 font-[400]">Nama</th>
            <th class="px-6 py-3 font-[400]">Harga</th>
            <th class="px-6 py-3 font-[400]">Jumlah</th>
            <th class="px-6 py-3 font-[400]">Subtotal</th>
            <th class="px-6 py-3 font-[400]"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in CartStore.cart" :key="prod.id" class="bg-white">
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              <img
                :src="prod.picture_url"
                alt="Product"
                class="w-[185px] h-[120px] object-cover rounded-[8px]"
              />
            </td>
            <td class="regular px-6 py-4 text-[20px] text-gray-900">
              {{ prod.name }}
            </td>
            <td class="regular px-6 py-4 text-[20px] text-gray-900">
              {{ formatRupiah(prod.price) }}
            </td>
            <td class="px-6 py-4 text-[20px] text-gray-900">
              <QtyCounter
                v-model="prod.qty"
                @decrease="handleDecrease(prod.id, prod.qty)"
                @increase="CartStore.updateQty(prod.id, 'increment')"
              />
            </td>
            <td class="regular px-6 py-4 text-[20px] font-[700] text-gray-900">
              {{ formatRupiah(prod.subtotal) }}
            </td>
            <td class="px-6 py-4">
              <a
                class="regular ml-2 font-[16px] cursor-pointer text-red-500"
                @click="deleteData(prod.id)"
              >
                Hapus
              </a>
            </td>
          </tr>
          <tr v-if="CartStore.cart.length === 0" class="bg-white border-b">
            <td colspan="6" class="px-6 py-4 text-center text-gray-500">
              No products found.
            </td>
          </tr>
        </tbody>
        <tfoot class="shadow-top h-[80px]">
          <tr class="bg-white border-b">
            <td colspan="6" class="px-6 py-4">
              <div class="flex justify-self-end justify-end gap-4">
                <OutlinedPrimaryButton
                  class="w-[150px]"
                  type="button"
                  @click="$router.push('/')"
                  label="Kembali"
                />
                <PrimaryButton
                  v-if="CartStore.cart.length > 0"
                  class="w-[150px]"
                  type="button"
                  label="Bayar"
                  @click="bayar"
                />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
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
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart.store.js";
import { formatRupiah } from "@/utils/formatRupiah";
import ConfirmDeleteModal from "@/utils/components/deleteModal.vue";
import Swal from "sweetalert2";
import QtyCounter from "@/utils/components/qtyCounter.vue";
import OutlinedPrimaryButton from "@/utils/components/buttons/outlinedPrimaryButton.vue";
import PrimaryButton from "@/utils/components/buttons/primaryButton.vue";

// Stores & Router
const CartStore = useCartStore();
const router = useRouter();

// State
const showConfirm = ref(false);
const deleteId = ref(null);

// Logic
const deleteData = (id) => {
  deleteId.value = id;
  showConfirm.value = true;
};

const handleConfirmDelete = () => {
  CartStore.delete(deleteId.value);
  showConfirm.value = false;
};

const handleDecrease = (id, qty) => {
  if (qty > 1) {
    CartStore.updateQty(id, "decrement");
  } else {
    deleteData(id);
  }
};

const bayar = async () => {
  const confirm = await Swal.fire({
    title: "Bayar",
    text: "Apakah anda yakin ingin melanjutkan pembayaran?",
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Ya",
  });

  if (confirm.isConfirmed) {
    CartStore.clear();

    await Swal.fire({
      title: "Pembayaran Berhasil",
      text: "Terima kasih telah melakukan pembayaran!",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
};
</script>
<style>
.shadow-top {
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
}
</style>
