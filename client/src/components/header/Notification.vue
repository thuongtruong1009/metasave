<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <button
    type="button"
    class="inline-flex h-min relative items-center p-2 text-sm font-medium text-black dark:text-white rounded-full hover:bg-purple-700 rounded-lg hover:text-white hover:ring-2 focus:outline-none hover:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:hover:ring-purple-800 shadow-lg shadow-gray-300 border dark:border-transparent dark:shadow-lg dark:shadow-purple-800/80"
  >
    <Icon icon="ri:notification-4-fill" width="20" />
    <div
      class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
    >
      20
    </div>
  </button>
</template>
