<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import BackgroundMenu from "./BackgroundMenu.vue";
import BoardMenu from "./BoardMenu.vue";
import ViewInfo from "./ViewInfo.vue";
import BoardService from "@/services/board.service";

const router = useRouter();
const boardId = router.currentRoute.value.params.boardId as string;

const props = defineProps<{
  progress: number;
  isFavorite: boolean;
}>();

const isFavorite = ref(false);
const toggleFavorite = async () => {
  isFavorite.value = !isFavorite.value;
  await BoardService.updateBoard(boardId, { isFavorite: isFavorite.value });
};
</script>

<template>
  <div class="flex justify-between items-center gap-5">
    <div class="flex items-end gap-5">
      <BoardMenu />
      <button
        type="button"
        @click="toggleFavorite"
        class="text-yellow-500 bg-white hover:bg-gray-50 dark:bg-gray-600 rounded-lg p-1 h-min shadow-md"
      >
        <Icon
          icon="ic:round-star-outline"
          v-if="!props.isFavorite"
          width="28"
        />
        <Icon icon="ic:round-star" v-else width="28" />
      </button>
      <div
        class="w-60 bg-white hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-300 rounded-lg py-1.5 px-2.5 shadow-md"
      >
        <div
          class="flex justify-between mb-1 text-xs font-medium text-purple-500 dark:text-white"
        >
          <span>Process</span>
          <span>{{ props.progress }}%</span>
        </div>
        <div
          class="w-full bg-gray-200 dark:bg-gray-500 rounded-full h-1 dark:bg-gray-700"
        >
          <div
            class="bg-purple-500 h-1 rounded-full"
            :style="`width: ${props.progress}%`"
          ></div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-5">
      <ViewInfo />
      <BackgroundMenu />
    </div>
  </div>
</template>
