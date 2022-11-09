<script setup lang="ts">
import { RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="dark:bg-gray-900 h-screen flex flex-col relative">
    <RouterView class="flex-grow p-4" />
    <Footer />
  </div>
</template>
