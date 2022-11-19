<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";

import AuthService from "@/services/auth.service";
import { testEmail, testPassword } from "@/utils/regrex";

const router = useRouter();

const payload = reactive({
  username: "",
  email: "",
  password: "",
});

const checkElement = reactive({
  checkUsername: "",
  checkEmail: "",
  checkPassword: "",
});

const validateUsername = computed(() => {
  if (payload.username.split("").length > 0) {
    if (payload.username !== payload.username.toLowerCase()) {
      checkElement.checkUsername = "Username must be lowercase";
      return false;
    }
    if (
      payload.username.split("").length > 0 &&
      payload.username.split("").length <= 3
    ) {
      checkElement.checkUsername = "Username must be at least 3 characters";
      return false;
    } else {
      checkElement.checkUsername = "";
      return true;
    }
  } else {
    checkElement.checkUsername = "Username is required";
    return false;
  }
});

const validateEmail = computed(() => {
  if (payload.email.length > 0) {
    if (!testEmail(payload.email)) {
      checkElement.checkEmail = "Email is invalid!";
      return false;
    } else {
      checkElement.checkEmail = "";
      return true;
    }
  } else {
    checkElement.checkEmail = "Email is required";
    return false;
  }
});

const validatePassword = computed(() => {
  if (payload.password.length > 0) {
    if (!testPassword(payload.password)) {
      checkElement.checkPassword =
        "Password must be 8-20 characters, conclude (uppercase - lowercase - number - special) characters!";
      return false;
    } else {
      checkElement.checkPassword = "";
      return true;
    }
  } else {
    checkElement.checkPassword = "Password is required";
    return false;
  }
});

const isValidate = computed(
  () => validateUsername.value && validateEmail.value && validatePassword.value
);

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
            validateUsername
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
            validateUsername
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
            validateEmail
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
            validateEmail
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
            validatePassword
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
            validatePassword
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
