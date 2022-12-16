<script setup>
import { ref, computed } from "vue";
import { getCurrentDate } from "@/helpers/date";

const getTime = computed(() => {
  return `${new Date().getHours()}:${
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes()
  }`;
});

const time = ref(getTime.value);

setInterval(() => {
  time.value = getTime.value;
}, 1000 * 60);
</script>

<template>
  <div class="flex items-center">
    <div
      class="timebar_coordinate bg-[#2EA52C] text-white text-xs font-medium h-6 w-12 ml-5 px-1 rounded-md"
    >
      {{ time }}
    </div>
    <div class="w-full h-[1.6px] bg-[#2EA52C]"></div>
  </div>
</template>

<style scoped>
.timebar_coordinate {
  clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
}
</style>
