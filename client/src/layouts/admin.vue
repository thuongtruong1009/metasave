<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/admin/header.vue";
</script>

<template>
  <main>
    <Header />

    <div
      class="flex flex-col items-center py-12 sm:py-24 px-4 sm:px-8 w-full max-h-screen overflow-y-scroll"
    >
      <router-view></router-view>
    </div>
  </main>
</template>
