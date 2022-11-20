<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <nav class="left_nav">
    <Icon
      icon="material-symbols:home-outline-rounded"
      width="42"
      class="bg-white rounded-full shadow-md p-2 cursor-pointer hover:bg-[#c3cff4] hover:text-white"
    />
    <Icon
      icon="material-symbols:calendar-today-outline"
      width="40"
      class="bg-white rounded-full shadow-md p-2 cursor-pointer hover:bg-[#c3cff4] hover:text-white"
    />
    <Icon
      icon="ep:setting"
      width="40"
      class="bg-white rounded-full shadow-md p-2 cursor-pointer hover:bg-[#c3cff4] hover:text-white"
    />
  </nav>
</template>
