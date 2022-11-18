<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";

import AuthService from "@/services/auth.service";

const router = useRouter();

const payload = reactive({
  username: "",
  email: "",
  password: "",
});

const isValidate = ref(false);
const checkElement = reactive({
  checkUsername: "",
  checkEmail: "",
  checkPassword: "",
});

const handleValidate = () => {
  if (payload.username || payload.email || payload.password) {
    (checkElement.checkUsername = ""),
      (checkElement.checkEmail = ""),
      (checkElement.checkPassword = ""),
      (isValidate.value = true);
  }
  isValidate.value = false;

  if (payload.username === "") {
    checkElement.checkUsername = "Username is required";
    isValidate.value = false;
  }
  if (payload.email === "") {
    checkElement.checkEmail = "Email is required";
    isValidate.value = false;
  }
  if (payload.password === "") {
    checkElement.checkPassword = "Password is required";
    isValidate.value = false;
  }
};

const handleSignup = async () => {
  await AuthService.signup(payload);
  router.push({ name: "signin" });
};
</script>

<template>
  <div class="signup">
    <!-- <h1>Sign Up</h1> -->
    <!-- <form @submit.prevent="handleSignup">
      <input type="text" placeholder="Username" v-model="payload.username" />
      <input type="email" placeholder="Email" v-model="payload.email" />
      <input
        type="password"
        placeholder="Password"
        v-model="payload.password"
      />
      <button type="submit">Create now</button>

      
    </form> -->
    <form @submit.prevent="handleSignup">
      <div class="mb-6">
        <label
          for="success"
          class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
          >Your name</label
        >
        <input
          type="text"
          class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-green-500"
          placeholder="Success input"
          v-model="payload.username"
          @input="handleValidate"
        />
        <p class="mt-2 text-sm text-green-600 dark:text-green-500">
          {{ checkElement.checkUsername }}
        </p>
      </div>

      <div class="mb-6">
        <label
          for="success"
          class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
          >Your email</label
        >
        <input
          type="text"
          class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-green-500"
          placeholder="Success input"
          v-model="payload.email"
          @input="handleValidate"
        />
        <p class="mt-2 text-sm text-green-600 dark:text-green-500">
          {{ checkElement.checkEmail }}
        </p>
      </div>

      <div>
        <label
          for="error"
          class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
          >Your password</label
        >
        <input
          type="text"
          class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
          placeholder="Error input"
          v-model="payload.password"
          @input="handleValidate"
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
          {{ checkElement.checkPassword }}
        </p>
      </div>
      <button
        type="button"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        @click="handleSignup"
      >
        Create now
      </button>
    </form>
  </div>
</template>
