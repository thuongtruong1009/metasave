<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

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
  checkTerms: false,
});

const validateUsername = computed(() => {
  if (payload.username.length > 0) {
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
  () =>
    validateUsername.value &&
    validateEmail.value &&
    validatePassword.value &&
    checkElement.checkTerms
);

const handleSignup = async () => {
  if (isValidate.value) {
    await AuthService.signup(payload);
    router.push({ name: "signin" });
  }
};
</script>

<template>
  <section
    class="signup_container bg-white rounded-3xl shadow-lg m-10 grid grid-cols-2"
  >
    <div class="signup_left p-10">
      <h1 class="text-4xl font-bold text-purple-800 text-center">Sign Up</h1>
      <div class="flex items-center my-10">
        <span class="w-16 h-0.5 bg-red-600 mr-5"></span>
        <h6 class="text-sm font-semibold text-red-600">Sign up with</h6>
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

      <form @submit.prevent="handleSignup" class="grid grid-cols-2 gap-5 my-5">
        <div class="mb-6 relative">
          <label for="success" class="block mb-2 text-sm font-semibold"
            >Your name</label
          >
          <input
            type="text"
            class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            :class="
              validateUsername
                ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
                : 'bg-red-50 border-green-500 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            "
            placeholder="Your username"
            v-model="payload.username"
            @input="validateUsername"
          />
          <p
            class="mt-2 text-xs absolute"
            :class="
              validateUsername
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500'
            "
          >
            {{ checkElement.checkUsername }}
          </p>
        </div>

        <div class="mb-6 relative">
          <label for="success" class="block mb-2 text-sm font-semibold"
            >Your email</label
          >
          <input
            type="text"
            class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            :class="
              validateEmail
                ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
                : 'bg-red-50 border-green-500 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            "
            placeholder="Your email"
            v-model="payload.email"
            @input="validateEmail"
          />
          <p
            class="mt-2 text-xs absolute"
            :class="
              validateEmail
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500'
            "
          >
            {{ checkElement.checkEmail }}
          </p>
        </div>

        <div class="mb-6 col-span-2 relative">
          <label for="success" class="block mb-2 text-sm font-semibold"
            >Your password</label
          >
          <input
            type="text"
            class="border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700"
            :class="
              validatePassword
                ? 'bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:border-green-500'
                : 'bg-red-50 border-green-500 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            "
            placeholder="Your password"
            v-model="payload.password"
            @input="validatePassword"
          />
          <p
            class="mt-2 text-xs absolute"
            :class="
              validatePassword
                ? 'text-green-600 dark:text-green-500'
                : 'text-red-600 dark:text-red-500'
            "
          >
            {{ checkElement.checkPassword }}
          </p>
        </div>

        <div class="flex items-center col-span-2">
          <input
            id="link-checkbox"
            type="checkbox"
            v-model="checkElement.checkTerms"
            class="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="link-checkbox"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >I've read and agree with
            <a href="#">Terms of Services</a>
            and our
            <a href="#"> Privacy Policy</a></label
          >
        </div>

        <button
          type="button"
          class="w-max flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-5 cursor-pointer"
          :class="
            isValidate
              ? 'focus:ring-4 hover:bg-gradient-to-br'
              : 'opacity-50 cursor-not-allowed'
          "
          @click="handleSignup"
        >
          <span>Create now</span
          ><Icon
            icon="material-symbols:arrow-right-alt-rounded"
            height="28"
            width="28"
          />
        </button>
      </form>
      <p class="text-sm">
        Already have an account? <router-link to="/signin">Signin</router-link>
      </p>
    </div>

    <div class="signup_right flex justify-center items-center">
      <img src="@/assets/img/auth/spring-promo.png" alt="signup_img" />
    </div>
  </section>
</template>
