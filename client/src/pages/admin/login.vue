<script setup lang="ts">
import { reactive, computed } from "vue";
import Button from "@/components/utilities/Button.vue";
import Input from "@/components/utilities/Input.vue";

const payload = reactive({
  username: "",
  password: "",
});

const isValidatePayload = computed(() => {
  return payload.username !== "" && payload.password !== "";
});

const handleLogin = () => {
  if (!isValidatePayload.value) return;
  console.log(payload);
};
</script>

<template>
  <div class="px-6 py-12 sm:py-20 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <img class="mx-auto h-10 w-auto" src="/logo.png" alt="logo" />
      <h2
        class="text-3xl mt-8 mb-4 font-bold tracking-tight text-gray-900 sm:text-4xl capitalize"
      >
        Login
      </h2>
      <p class="text-base leading-8 text-gray-600">
        Schedule management platform for individuals and teams
      </p>
    </div>

    <form
      @submit.prevent="handleLogin"
      class="mx-auto mt-16 max-w-xl sm:mt-20 grid grid-cols-1 gap-x-8 gap-y-6"
    >
      <div>
        <label
          for="company"
          class="block text-sm font-semibold leading-6 text-gray-900"
          >Username or Email</label
        >
        <div class="mt-2.5">
          <Input
            :value="payload.username"
            type="email"
            @update:value="payload.username = $event"
            :required="true"
          />
        </div>
      </div>
      <div>
        <label class="block text-sm font-semibold leading-6 text-gray-900"
          >Password</label
        >
        <Input
          :value="payload.password"
          type="password"
          :required="true"
          @update:value="payload.password = $event"
        />
      </div>
      <Button
        text="Login"
        @onSubmit="handleLogin"
        class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 capitalize"
      />
    </form>
  </div>
</template>
