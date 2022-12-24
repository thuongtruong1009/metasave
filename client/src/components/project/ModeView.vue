<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const isGridView = ref<boolean>(true);

const changeToggleView = (index: number): void => {
  if (index === 1) {
    isGridView.value = false;
  } else {
    isGridView.value = true;
  }
};
</script>

<template>
  <div class="flex h-min">
    <button
      type="button"
      @click="changeToggleView(1)"
      class="rounded-md p-1 dark:text-white"
      :class="
        isGridView ? 'hover:bg-[#E9E7FD] text-black' : 'bg-black text-white'
      "
    >
      <Icon icon="ic:baseline-format-list-bulleted" width="24" />
    </button>
    <button
      type="button"
      @click="changeToggleView(2)"
      class="rounded-md p-1 ml-2 dark:text-white"
      :class="
        isGridView ? 'bg-black text-white' : 'hover:bg-[#E9E7FD] text-black'
      "
    >
      <Icon icon="material-symbols:grid-view-outline-rounded" width="24" />
    </button>
  </div>
</template>
