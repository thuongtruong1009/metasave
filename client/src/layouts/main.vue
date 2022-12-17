<script setup>
import { useRouter } from "vue-router";
import Brand from "@/components/header/Brand.vue";
import LeftNavigation from "@/components/LeftNavigation.vue";
import DarkMode from "@/components/header/DarkMode.vue";
import Notification from "@/components/header/Notification.vue";
import Search from "@/components/header/Search.vue";
import Avatar from "@/components/header/Avatar.vue";
import CreateProject from "@/components/header/CreateProject.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <main
    class="home_page px-5 bg-[#F3F6FD] dark:bg-gray-800 relative overflow-x-hidden"
  >
    <div class="flex h-min min-h-[calc(100%-50px)] w-full mb-5">
      <LeftNavigation class="min-h-full" />
      <div class="flex flex-col items-center w-full ml-5">
        <div class="flex justify-between items-center item my-5 w-full">
          <Brand />
          <Search />
          <div class="flex items-end gap-5">
            <CreateProject />
            <DarkMode />
            <Notification />
            <Avatar />
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
    <Footer />
  </main>
</template>
