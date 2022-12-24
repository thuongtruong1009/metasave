<script setup lang="ts">
import { reactive, onMounted, watchEffect } from "vue";
import OverView from "@/components/project/OverView.vue";
import ModeView from "@/components/project/ModeView.vue";
import ProjectBox from "@/components/project/ProjectBox.vue";
import { projectBoxColors } from "@/shared/color";
import Sort from "@/components/Sort.vue";
import ProjectService from "@/services/project.service";
import useAuthStore from "@/store/auth";
import { getIndex } from "@/utils/array";
import { getCurrentDate } from "@/helpers/date";

const authStore = useAuthStore();

const payload = reactive({
  access: "all",
  limit: 12,
  sort: "all",
  filter: "all",
});

const payget = reactive<any>({
  total: "",
  lastUpdated: "",
  projects: [],
});

const getAllProjects = async () => {
  const res = await ProjectService.getProjects(
    payload.access,
    payload.limit,
    payload.sort,
    payload.filter
  );
  if (res) {
    payget.projects = res.data.projects;
    payget.total = res.data.total;
    payget.lastUpdated = res.data.lastUpdated[0]?.updatedAt;
  }
};

watchEffect(() => {
  getAllProjects();
});
</script>

<template>
  <section
    class="text-gray-600 ml-5 p-5 bg-white dark:bg-gray-700 rounded-2xl w-full"
  >
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Overview</h1>
      <h5 class="text-sm font-medium italic">
        Last updated: {{ getCurrentDate(payget.lastUpdated).year }}
        {{ getCurrentDate(payget.lastUpdated).monthName }},
        {{ getCurrentDate(payget.lastUpdated).day }}
      </h5>
    </div>
    <div class="flex justify-between items-center">
      <OverView :total="payget.total" />
      <div class="flex gap-10 items-end">
        <Sort />
        <ModeView />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-3">
      <ProjectBox
        v-for="(project, i) in payget.projects"
        :key="project._id"
        :bgColor="`${projectBoxColors[getIndex(projectBoxColors, i)].bg}`"
        :progressColor="`${
          projectBoxColors[getIndex(projectBoxColors, i)].progress
        }`"
        :project="project"
        @favorited="getAllProjects"
      />
    </div>
  </section>
</template>
