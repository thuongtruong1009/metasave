<script setup lang="ts">
import ProjectMenu from "./ProjectMenu.vue";
import BackgroundMenu from "./BackgroundMenu.vue";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/20/solid";

const props = defineProps<{
  description: string;
  progress: number;
}>();
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex">
      <ProjectMenu />
      <div class="w-60 bg-white/90 rounded-lg p-2 mx-5">
        <div
          class="flex justify-between mb-1 text-sm font-medium text-purple-500 dark:text-white"
        >
          <span>Process</span>
          <span>{{ props.progress }}%</span>
        </div>
        <div class="w-full bg-white rounded-full h-2 dark:bg-gray-700">
          <div
            class="bg-purple-500 h-2 rounded-full"
            :style="`width: ${props.progress}%`"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center text-white">
      <div class="flex items-center mx-5 text-white text-sm italic">
        <ChatBubbleBottomCenterTextIcon class="h-5 w-4" aria-hidden="true" />
        <quote class="ml-2">{{ props.description }}</quote>
      </div>
      <BackgroundMenu />
    </div>
  </div>
</template>
