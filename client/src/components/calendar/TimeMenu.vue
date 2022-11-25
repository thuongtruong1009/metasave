<script setup>
import { reactive } from "vue";
import { TabGroup, TabList, Tab } from "@headlessui/vue";

const categories = reactive([
  { name: "Day", icon: "heroicon-o-view-grid" },
  { name: "Week", icon: "heroicon-o-calendar" },
  { name: "Month", icon: "heroicon-o-clock" },
]);
</script>

<template>
  <TabGroup class="w-full max-w-md">
    <TabList
      class="flex space-x-1 rounded-xl bg-[#E6F5DD] dark:bg-gray-600 p-1.5"
    >
      <Tab
        v-for="(category, i) in categories"
        as="template"
        :key="i"
        v-slot="{ selected }"
      >
        <button
          :class="[
            'w-full rounded-lg py-1.5 text-sm font-medium leading-5 text-gray-400',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400',
            selected
              ? 'bg-[#BBE6A8] dark:bg-gray-500 text-blue-700 dark:text-gray-200 font-semibold'
              : 'hover:bg-white/[0.12]',
          ]"
        >
          {{ category.name }}
        </button>
      </Tab>
    </TabList>
  </TabGroup>
</template>
