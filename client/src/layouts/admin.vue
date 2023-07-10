<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/admin/header.vue";
</script>

<template>
  <main class="min-h-screen h-screen max-h-screen">
    <Header />

    <div class="flex flex-col items-center py-12 sm:py-24 px-4 sm:px-8">
      <router-view></router-view>
    </div>
  </main>
</template>
