<script setup>
import { reactive, onMounted, watchEffect } from "vue";
import OverView from "@/components/home/OverView.vue";
import ModeView from "@/components/home/ModeView.vue";
import ProjectBox from "@/components/home/ProjectBox.vue";
import { projectBoxColors } from "@/shared/color";
import Sort from "@/components/Sort.vue";
import ProjectService from "@/services/project.service";
import { useAuthStore } from "@/store/auth";
import { getIndex } from "@/utils/array";

const authStore = useAuthStore();

const payload = reactive({
  projects: [],
  sort: "all",
});

onMounted(async () => {
  const res = await ProjectService.getProjects(authStore.getUser.id, {
    params: { sort: payload.sort },
  });
  if (res) {
    payload.projects = res.data.projects;
  }
});
//{"total":1,"projects":[{"props":{"orientation":"horizontal"},"_id":"6384c9557ac3fdfe3699c191","owner":"63779ce59619858116b3f938","type":"container","name":"Project 1","access":"public","description":"Project 1 description","category":"category1","background":"background1","customBackground":"http://www.example.com/image.png","columns":[],"__v":0}]}
</script>

<template>
  <section
    class="text-gray-600 ml-5 p-5 bg-white dark:bg-gray-700 rounded-2xl w-2/3"
  >
    <div class="flex justify-between">
      <h1 class="text-2xl font-semibold">Overview</h1>
      <h5 class="text-sm font-medium italic">Last active: 2022 December, 12</h5>
    </div>
    <div class="flex justify-between items-center">
      <OverView />
      <div class="flex gap-10 items-end">
        <Sort />
        <ModeView />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-3">
      <ProjectBox
        v-for="(project, i) in payload.projects"
        :key="project._id"
        :bgColor="`${projectBoxColors[getIndex(projectBoxColors, i)].bg}`"
        :progressColor="`${
          projectBoxColors[getIndex(projectBoxColors, i)].progress
        }`"
        :project="project"
      />
    </div>
  </section>
</template>
