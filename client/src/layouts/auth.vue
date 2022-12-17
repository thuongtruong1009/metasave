<script setup>
import { RouterView } from "vue-router";
import SignupPage from "@/pages/auth/signup.vue";
</script>

<template>
  <main class="auth_layout min-h-screen max-h-screen h-screen overflow-hidden">
    <router-view></router-view>
  </main>
</template>

<style scoped>
.auth_layout {
  background: linear-gradient(270deg, #e3ffe7 0%, #d9e7ff 100%);
}
</style>
