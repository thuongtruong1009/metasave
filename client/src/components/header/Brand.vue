<script setup>
import { useRouter } from "vue-router";
import Logo from "@/components/header/Logo.vue";

const router = useRouter();
const backHome = () => router.push({ name: "home" });
</script>

<template>
  <div class="flex items-center cursor-pointer" @click="backHome">
    <Logo />
    <h1
      class="text-3xl font-bold mx-5 text-[#2c3591] dark:text-gray-300"
      style="text-shadow: 1px 1px 1px #888"
    >
      Metasave
    </h1>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
h1 {
  font-family: "Pacifico", cursive;
  vertical-align: middle;
  text-shadow: 0px 3px 3px rgba(171, 111, 121, 0.5) !important;
  letter-spacing: 2px !important;
}
</style>
