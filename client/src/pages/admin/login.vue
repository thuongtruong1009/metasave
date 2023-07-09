<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import AuthForm from "@/components/accessibilities/AuthForm.vue";

const payload = reactive({
  username: "",
  password: "",
});

const isValidatePayload = computed(() => {
  return payload.username !== "" && payload.password !== "";
});

const handleLogin = (payload: { username: string; password: string }) => {
  console.log(payload);
};

const inputValue = ref("");
</script>

<template>
  <AuthForm
    title="login"
    username="username"
    password="password"
    v-model="inputValue"
    @onSubmit="handleLogin($event)"
  />
</template>
