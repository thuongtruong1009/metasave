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
  validUsername: false,
  checkEmail: "",
  validEmail: false,
  checkPassword: "",
  validPassword: false,
});

const validateUsername = () => {
  if (payload.username.split("").length < 3) {
    checkElement.checkUsername = "Username must be at least 3 characters";
    checkElement.validUsername = false;
  }
  if (payload.username === "") {
    checkElement.checkUsername = "Username is required";
    checkElement.validUsername = false;
  } else {
    checkElement.checkUsername = "";
    checkElement.validUsername = true;
  }
};

const validateEmail = () => {
  if (payload.email === "") {
    checkElement.checkEmail = "Email is required";
    checkElement.validEmail = false;
  } else {
    checkElement.checkEmail = "";
    checkElement.validEmail = true;
  }
};

const validatePassword = () => {
  if (payload.password.length < 6) {
    checkElement.checkPassword = "Password must be at least 6 characters";
    checkElement.validPassword = false;
  }
  if (payload.password === "") {
    checkElement.checkPassword = "Password is required";
    checkElement.validPassword = false;
  } else {
    checkElement.checkPassword = "";
    checkElement.validPassword = true;
  }
};

watchEffect(() => {
  if (
    checkElement.validUsername &&
    checkElement.validEmail &&
    checkElement.validPassword
  ) {
    isValidate.value = true;
  } else {
    isValidate.value = false;
  }
});

const handleSignup = async () => {
  if (isValidate.value) {
    console.log(isValidate.value);
    await AuthService.signup(payload);
    router.push({ name: "signin" });
  }
};
</script>

<template>
  <div class="signup">
    <form @submit.prevent="handleSignup">
      <div class="mb-6">
        <label
          for="success"
          class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
          >Your name</label
        >
        <input
          type="text"
          class="border text-sm rounded-lg block w-1/2 p-2.5 dark:bg-gray-700"
          :class="
            checkElement.validUsername
              ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
              : 'bg-red-50 border-green-500 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
          "
          placeholder="Success input"
          v-model="payload.username"
          @input="validateUsername"
        />
        <p
          class="mt-2 text-sm"
          :class="
            checkElement.validUsername
              ? 'text-green-600 dark:text-green-500'
              : 'text-red-600 dark:text-red-500'
          "
        >
          {{ checkElement.checkUsername }}
        </p>
      </div>

      <div class="mb-6">
        <label
          for="success"
          class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
          >Your name</label
        >
        <input
          type="text"
          class="border text-sm rounded-lg block w-1/2 p-2.5 dark:bg-gray-700"
          :class="
            checkElement.validEmail
              ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
              : 'bg-red-50 border-green-500 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
          "
          placeholder="Success input"
          v-model="payload.email"
          @input="validateEmail"
        />
        <p
          class="mt-2 text-sm"
          :class="
            checkElement.validEmail
              ? 'text-green-600 dark:text-green-500'
              : 'text-red-600 dark:text-red-500'
          "
        >
          {{ checkElement.checkEmail }}
        </p>
      </div>

      <div class="mb-6">
        <label
          for="success"
          class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
          >Your name</label
        >
        <input
          type="text"
          class="border text-sm rounded-lg block w-1/2 p-2.5 dark:bg-gray-700"
          :class="
            checkElement.validPassword
              ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
              : 'bg-red-50 border-green-500 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
          "
          placeholder="Success input"
          v-model="payload.password"
          @input="validatePassword"
        />
        <p
          class="mt-2 text-sm"
          :class="
            checkElement.validPassword
              ? 'text-green-600 dark:text-green-500'
              : 'text-red-600 dark:text-red-500'
          "
        >
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
