<script setup>
import { useRouter } from "vue-router";
import Brand from "@/components/header/Brand.vue";
import LeftNavigation from "@/components/LeftNavigation.vue";
import DarkMode from "@/components/header/DarkMode.vue";
import Notification from "@/components/header/Notification.vue";
import Search from "@/components/header/Search.vue";
import Avatar from "@/components/header/Avatar.vue";
import CreateProject from "@/components/header/CreateProject.vue";
</script>

<template>
  <main class="home_page px-5 pt-2">
    <div class="flex justify-between item px-5">
      <Brand />
      <Search />
      <div class="flex items-end gap-5">
        <CreateProject />
        <DarkMode />
        <Notification />
        <Avatar />
      </div>
    </div>

    <div class="flex items-center my-10">
      <LeftNavigation />
      <router-view></router-view>
    </div>
  </main>
</template>
