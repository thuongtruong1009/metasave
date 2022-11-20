<script setup>
import { Icon } from "@iconify/vue";
import LeftNavigation from "@/components/LeftNavigation.vue";
import DarkMode from "@/components/DarkMode.vue";
import Notification from "@/components/Notification.vue";
import Avatar from "./Avatar.vue";
import Modal from "@/components/Modal.vue";
</script>

<template>
  <section class="home_page bg-[#F3F6FD]">
    <div class="flex justify-between item p-5">
      <div class="flex items-center">
        <h1 class="text-xl font-bold mr-5">Project</h1>
        <form
          class="relative flex w-96 h-min p-0.5 pl-3 border border-purple-500 rounded-3xl bg-gray-50"
        >
          <input
            type="input"
            class="w-[80%] p-2 text-sm text-gray-900 border-none ring-trasnparent focus:ring-0 focus:outline-none"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            class="flex items-center text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-2xl text-sm px-4 py-1.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            <Icon icon="ic:baseline-search" width="20" /> <span>Search</span>
          </button>
        </form>
      </div>
      <div class="flex items-end gap-5">
        <DarkMode />
        <Notification />
        <Avatar />
      </div>
    </div>

    <div>
      <LeftNavigation />
      <div>Main area</div>
      <Modal />
    </div>
  </section>
</template>
