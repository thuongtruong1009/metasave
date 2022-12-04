<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="dark:bg-gray-900 h-screen flex flex-col relative">
    <RouterView class="flex-grow" />
  </div>
</template>
