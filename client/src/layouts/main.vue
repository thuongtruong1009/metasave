<script setup>
import { useRouter } from "vue-router";
import Logo from "@/components/header/Logo.vue";
import LeftNavigation from "@/components/LeftNavigation.vue";
import DarkMode from "@/components/header/DarkMode.vue";
import Notification from "@/components/header/Notification.vue";
import Search from "@/components/header/Search.vue";
import Avatar from "@/components/header/Avatar.vue";
import CreateProject from "@/components/header/CreateProject.vue";

const router = useRouter();
const backHome = () => router.push({ name: "home" });
</script>

<template>
  <main class="home_page bg-[#F3F6FD] dark:bg-gray-800 p-5">
    <div class="flex justify-between item">
      <div class="flex items-center">
        <Logo @click="backHome" />
        <h1
          class="text-2xl font-bold mx-5"
          style="text-shadow: 2px 2px 2px pink"
          @click="backHome"
        >
          Metasave
        </h1>
        <Search />
      </div>
      <div class="flex items-end gap-5">
        <CreateProject />
        <DarkMode />
        <Notification />
        <Avatar />
      </div>
    </div>

    <div class="flex items-center my-10">
      <LeftNavigation />
      <div class="ml-5 p-5 bg-white dark:bg-gray-700 rounded-2xl w-2/3">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
