<script setup>
import { Icon } from "@iconify/vue";
</script>

<template>
  <form
    class="relative flex w-96 h-min p-0.5 pl-3 border border-purple-500 rounded-3xl bg-gray-50 dark:bg-gray-700"
  >
    <input
      type="input"
      class="w-[80%] p-2 text-sm text-gray-900 bg-transparent border-none ring-trasnparent focus:ring-0 focus:outline-none dark:text-gray-300"
      placeholder="Search Project, User..."
      required
    />
    <button
      type="submit"
      class="flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-2xl text-sm px-4 py-1.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
    >
      <Icon icon="ic:baseline-search" width="20" /> <span>Search</span>
    </button>
  </form>
</template>
