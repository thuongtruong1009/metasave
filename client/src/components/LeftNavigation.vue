<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { INav } from "@/types";

const router = useRouter();
const matchRoute = (query: string): boolean =>
  router.currentRoute.value.path === query ? true : false;

const toggles: Array<INav> = [
  {
    path: "/projects",
    icon: "material-symbols:home-outline-rounded",
    width: 42,
    title: "projects",
  },
  {
    path: "/calendar",
    icon: "material-symbols:calendar-today-outline",
    width: 40,
    title: "calendar",
  },
  {
    path: "/settings",
    icon: "ep:setting",
    width: 42,
    title: "settings",
  },
  {
    path: "/about",
    icon: "mdi:about-circle-outline",
    width: 42,
    title: "about",
  },
];

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push({ name: "signin" });
};
</script>

<template>
  <nav class="flex flex-col items-center justify-center gap-6">
    <router-link
      :to="toggle.path"
      v-for="(toggle, i) in toggles"
      :key="i"
      :title="toggle.title"
    >
      <Icon
        :icon="toggle.icon"
        :width="toggle.width"
        class="rounded-full p-2 cursor-pointer"
        :class="
          matchRoute(toggle.path)
            ? 'bg-black text-white dark:bg-gray-700'
            : 'hover:bg-[#c3cff4]'
        "
      />
    </router-link>

    <Icon
      icon="ri:logout-circle-r-line"
      width="40"
      class="rounded-full p-2 cursor-pointer hover:bg-[#c3cff4] text-purple-500"
      @click="logout"
      title="logout"
    />
  </nav>
</template>
