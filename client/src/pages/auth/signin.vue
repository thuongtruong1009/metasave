<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

import AuthService from "@/services/auth.service";
import { testEmail, testPassword } from "@/utils/regrex";
import useAuthStore from "@/store/auth";

const router = useRouter();
const authStore = useAuthStore();

const payload = reactive({
  username: "",
  password: "",
});

const isValidate = computed(
  () => payload.username.length > 0 && payload.password.length > 0
);

const handleSignin = async () => {
  if (isValidate.value) {
    const res = await AuthService.signin(payload);
    if (res.data) {
      await authStore.login(res.data);
      router.push({ path: "/home" });
    }
  }
};
</script>

<template>
  <section
    class="signup_container bg-white rounded-3xl shadow-lg m-10 grid grid-cols-2"
  >
    <div class="signup_left p-10">
      <h1 class="text-4xl font-bold text-purple-800 text-center">Sign In</h1>
      <div class="flex items-center my-10">
        <span class="w-16 h-0.5 bg-red-600 mr-5"></span>
        <h6 class="text-sm font-semibold text-red-600">Sign in with</h6>
      </div>

      <div>
        <button
          type="button"
          class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-end dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          <Icon icon="uim:facebook-f" width="18" class="text-blue-600 mr-1.5" />
          <span>Sign in with Facebook</span>
        </button>
        <button
          type="button"
          class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-end dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          <Icon icon="mdi:google" width="18" class="text-red-500 mr-1.5" />
          <span>Sign in with Google</span>
        </button>
        <button
          type="button"
          class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-end dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
        >
          <Icon icon="mdi:github" width="20" class="mr-1.5" />
          <span>Sign in with Github</span>
        </button>
      </div>

      <form @submit.prevent="handleSignin" class="grid grid-cols-2 gap-5 my-5">
        <div class="mb-6 relative">
          <label for="success" class="block mb-2 text-sm font-semibold"
            >Your name</label
          >
          <input
            type="text"
            class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            placeholder="Your username"
            v-model="payload.username"
          />
        </div>

        <div class="mb-6 col-span-2 relative">
          <label for="success" class="block mb-2 text-sm font-semibold"
            >Your password</label
          >
          <input
            type="text"
            class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            placeholder="Your password"
            v-model="payload.password"
          />
        </div>

        <button
          type="button"
          class="w-max flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-5 cursor-pointer"
          :class="
            isValidate
              ? 'focus:ring-4 hover:bg-gradient-to-br'
              : 'opacity-50 cursor-not-allowed'
          "
          @click="handleSignin"
        >
          <span>Login</span
          ><Icon
            icon="material-symbols:arrow-right-alt-rounded"
            height="28"
            width="28"
          />
        </button>
      </form>
      <p class="text-sm">
        Not have an account?
        <router-link to="/auth/signiup">Signup</router-link>
      </p>
    </div>

    <div class="signup_right flex justify-center items-center">
      <img src="@/assets/img/auth/spring-promo.png" alt="signup_img" />
    </div>
  </section>
</template>
