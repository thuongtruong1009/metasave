<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BackgroundMenu from "./BackgroundMenu.vue";
import Combobox from "./Combobox.vue";

const props = defineProps<{
  description: string;
  progress: number;
}>();
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex">
      <Combobox />
      <div class="w-60 bg-white/90 rounded-lg p-2 mx-5">
        <div
          class="flex justify-between mb-1 text-sm font-medium text-purple-500 dark:text-white"
        >
          <span>Process</span>
          <span>{{ props.progress }}%</span>
        </div>
        <div class="w-full bg-white rounded-full h-1.5 dark:bg-gray-700">
          <div
            class="bg-purple-500 h-1.5 rounded-full"
            :style="`width: ${props.progress}%`"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center text-white">
      <div class="flex items-center mx-5 text-white text-sm italic">
        <Icon icon="material-symbols:text-snippet-outline" />
        <quote class="ml-2">{{ props.description }}</quote>
      </div>
      <BackgroundMenu />
    </div>
  </div>
</template>
