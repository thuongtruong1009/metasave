<script setup>
import { getCurrentDate } from "@/helpers/date";
</script>

<template>
  <div class="flex items-center">
    <div
      class="timebar_coordinate bg-[#2EA52C] text-white text-xs font-medium h-5 w-12 ml-5 pr-1 flex items-center justify-center rounded-md"
    >
      {{ new Date().getHours() }}:{{ new Date().getMinutes() }}
    </div>
    <div class="w-full h-[1.6px] bg-[#2EA52C]"></div>
  </div>
</template>

<style scoped>
.timebar_coordinate {
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
}
</style>
