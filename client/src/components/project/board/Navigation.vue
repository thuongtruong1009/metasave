<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import BackgroundMenu from "./BackgroundMenu.vue";
import MenuBoard from "./MenuBoard.vue";

const props = defineProps<{
  description: string;
  progress: number;
}>();

const isFavorite = ref(false);
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex">
      <MenuBoard />
      <button
        type="button"
        @click="toggleFavorite"
        class="text-yellow-500 bg-gray-300 rounded-lg p-1 mx-5 h-min"
      >
        <Icon icon="ic:round-star-outline" v-if="!isFavorite" width="30" />
        <Icon icon="ic:round-star" v-else width="30" />
      </button>
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
    <div class="flex items-center">
      <div class="flex items-center mx-5 text-sm italic">
        <Icon icon="material-symbols:text-snippet-outline" />
        <quote class="ml-2">{{ props.description }}</quote>
      </div>
      <BackgroundMenu />
    </div>
  </div>
</template>
