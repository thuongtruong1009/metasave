<script setup>
import TimeMenu from "@/components/calendar/TimeMenu.vue";
import { personalHours } from "@/shared/time";
</script>

<template>
  <section>
    <div class="flex justify-between">
      <h1 class="text-xl font-semibold">July 2022</h1>
      <TimeMenu />
    </div>

    <div
      class="overflow-x-auto relative bg-pink-50 overflow-y-scroll h-96 max-h-96 w-full"
    >
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6" v-for="(day, i) in 7" :key="i">
              {{ i }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            v-for="(hour, i) in personalHours"
            :key="i"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ hour }}
            </th>
            <td class="py-4 px-6">Sliver</td>
            <td class="py-4 px-6">Laptop</td>
            <td class="py-4 px-6">$2999</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0.3rem;
}
::-webkit-scrollbar-thumb {
  border-radius: 50rem;
}
</style>
