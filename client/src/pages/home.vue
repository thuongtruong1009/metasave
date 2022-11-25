<script setup>
import OverView from "@/components/home/OverView.vue";
import ModeView from "@/components/home/ModeView.vue";
import ProjectBox from "@/components/home/ProjectBox.vue";
import { projectBoxColors } from "@/shared/color";
import Sort from "@/components/Sort.vue";
</script>

<template>
  <section
    class="text-gray-600 ml-5 p-5 bg-white dark:bg-gray-700 rounded-2xl w-2/3"
  >
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Overview</h1>
      <h5 class="text-sm font-medium italic">Last active: 2022 December, 12</h5>
    </div>
    <div class="flex justify-between items-center">
      <OverView />
      <div class="flex gap-10 items-end">
        <Sort />
        <ModeView />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-3">
      <ProjectBox
        v-for="i in 6"
        :key="i"
        :bgColor="`${projectBoxColors[i - 1].bg}`"
        :progressColor="`${projectBoxColors[i - 1].progress}`"
      />
    </div>
  </section>
</template>
