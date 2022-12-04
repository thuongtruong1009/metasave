<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div
    class="bg-[#F3F6FD] dark:bg-gray-800 min-h-screen flex flex-col relative"
  >
    <RouterView class="flex-grow" />
    <Footer />
  </div>
</template>
