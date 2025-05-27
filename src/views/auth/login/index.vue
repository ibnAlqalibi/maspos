<template>
  <div
    class="flex justify-center gap-[24px] items-center h-screen bg-[#EDF0F2] p-[32px]"
  >
    <div class="h-full w-full">
      <Jumbotron />
    </div>
    <div class="h-full w-full p-[24px]">
      <h2 class="regular text-right text-3xl font-bold mb-6 text-[#1963D2]">
        MASPOS
      </h2>
      <div class="w-full h-full flex flex-col justify-center">
        <P class="regular mb-[8px] font-[500] text-[32px]">
          Selamat Datang di MASPOS
        </P>
        <P class="regular mb-[24px] font-[400] text-[20px]">
          Masuk untuk mengelola bisnis Anda dengan mudah dan efisien. MASPOS
          menghadirkan solusi point-of-sale terbaik untuk kemudahan operasional
          sehari-hari.
        </P>
        <form @submit.prevent="login">
          <div class="mb-4">
            <EmailInput
              v-model="formData.email"
              :error="errors.password"
              label="Email"
              placeholder="Masukkan email"
            />
          </div>
          <div class="mb-[32px]">
            <PasswordInput
              v-model="formData.password"
              :error="errors.password"
              label="Password"
              placeholder="Masukkan password"
            />
          </div>
          <PrimaryButton
            class="w-full bg-[#2c59e5] hover:bg-[#1e45b2]"
            type="submit"
            label="Masuk"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store.js";
import router from "@/router/index.js";
import PrimaryButton from "@/components/buttons/primaryButton.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";
import EmailInput from "@/components/inputs/EmailInput.vue";
import Jumbotron from "@/components/Jumbotron.vue";

const authStore = useAuthStore();
const formData = ref({
  email: "",
  password: "",
});
const errors = ref({
  password: null,
});

const login = async () => {
  try {
    const response = await authStore.login(formData.value);

    if (response.status !== 200) {
      errors.value.password = "Email atau password salah.";
    } else {
      errors.value.password = null;
      router.push("/");
    }
  } catch (error) {
    errors.value.password = "Terjadi kesalahan saat login.";
    console.error(error);
  }
};
</script>
