<script setup>
import OverView from "@/components/home/OverView.vue";
import ModeView from "@/components/home/ModeView.vue";
import ProjectBox from "@/components/home/ProjectBox.vue";
import { projectBoxColors } from "@/shared/color";
</script>

<template>
  <section class="text-gray-600">
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Overview</h1>
      <h5 class="text-sm font-medium italic">Last active: 2022 December, 12</h5>
    </div>
    <div class="flex justify-between items-center">
      <OverView />
      <ModeView />
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
