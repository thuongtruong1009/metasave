<script setup lang="ts">
import { reactive, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import ProjectService from "@/services/project.service";

const router = useRouter();

const projects = reactive({
  kanban: [
    { id: 1, name: "kanban 1" },
    { id: 2, name: "kanban 2" },
    { id: 3, name: "kanban 3" },
    { id: 4, name: "kanban 4" },
    { id: 5, name: "kanban 5" },
    { id: 6, name: "kanban 6" },
  ],
  table: [
    { id: 1, name: "table 1" },
    { id: 2, name: "table 2" },
    { id: 3, name: "table 3" },
    { id: 4, name: "table 4" },
    { id: 5, name: "table 5" },
    { id: 6, name: "table 6" },
  ],
});

const projectId = router.currentRoute.value.params.projectId as string;

watchEffect(async () => {
  const { data } = await ProjectService.getProjectById(projectId);
  console.log(data);
});

// {"props":{"orientation":"horizontal"},"_id":"639934a400daa0b3ec71a528","owner":{"_id":"638e20cf7cc65d797b25f52b","username":"user01"},"type":"container","name":"Project của Thịnh","access":"private","description":"Trùm OS","categoryId":"2","members":[],"isFavorite":false,"background":"#ffffff","customBackground":"","boards":[],"startDate":"2022-12-14T02:22:48.970Z","endDate":"2022-12-14T02:22:48.970Z","createdAt":"2022-12-14T02:27:48.989Z","updatedAt":"2022-12-17T07:04:14.218Z","__v":0}

const isOpenInside = computed(() => {
  return router.currentRoute.value.path.includes("kanban");
});

const goToKanban = (kanbanId: string) => {
  const path = `/project/${projectId}/kanban/${kanbanId}`;
  return path;
};
</script>

<template>
  <section class="p-5 bg-white dark:bg-gray-700 rounded-2xl w-full">
    <div class="flex gap-10" v-if="!isOpenInside">
      <router-link
        :to="goToKanban(i)"
        v-for="i in ['0', '1', '2', '3', '4', '5']"
        :key="i"
        >Kanban {{ i }}</router-link
      >
    </div>

    <router-view></router-view>
  </section>
</template>
