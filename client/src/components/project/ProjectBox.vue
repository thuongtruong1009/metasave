<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import ProjectService from "@/services/project.service";
import { getCurrentDate } from "@/helpers/date";
const router = useRouter();

defineProps<{
  bgColor: string;
  progressColor: string;
  project: any;
}>();

const emit = defineEmits<{
  (event: "favorited"): void;
}>();

const openProject = (projectId: string) => {
  router.push(`/project/${projectId}`);
};

const onFavorite = async (projectId: string, isFavorite: boolean) => {
  const res = await ProjectService.updateProject(projectId, {
    isFavorite: !isFavorite,
  });
  res && emit("favorited");
};
</script>

<template>
  <div
    class="project_box_container rounded-3xl shadow-md hover:shadow-lg group"
    :class="`bg-[${bgColor}]`"
  >
    <div class="p-4 border-b border-b-white">
      <div class="flex justify-between">
        <p class="font-thin text-sm text-gray-500/80">
          {{ getCurrentDate(project.createdAt).monthName }}
          {{ getCurrentDate(project.createdAt).day }},
          {{ getCurrentDate(project.createdAt).year }}
        </p>
        <button
          type="button"
          class="hover:bg-white/50 rounded-full p-1 opacity-0 group-hover:opacity-100"
        >
          <Icon icon="material-symbols:more-vert" width="20" />
        </button>
      </div>
      <div class="flex justify-center">
        <h3
          class="text-xl font-semibold text-center my-3 cursor-pointer hover:text-purple-500 hover:underline"
          @click="openProject(project._id)"
        >
          {{ project.name }}
        </h3>
      </div>
      <div class="text-sm font-semibold dark:text-white">Progress</div>
      <div class="w-full bg-white rounded-full h-1 my-1">
        <div
          class="h-1 rounded-full dark:bg-blue-500"
          :class="`bg-[${progressColor}]`"
          style="width: 45%"
        ></div>
      </div>
      <div class="text-sm font-semibold dark:text-white text-right">45%</div>
    </div>
    <div class="p-4 flex justify-between">
      <div class="flex -space-x-2">
        <img
          class="w-6 h-6 rounded-full border border-white dark:border-gray-800"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="participant_img"
          v-for="i in 3"
          :key="i"
        />
        <a
          class="flex justify-center items-center w-6 h-6 text-xs font-medium text-white bg-gray-500 rounded-full border border-white dark:border-gray-800"
          href="#"
          >+3</a
        >
      </div>
      <p
        class="rounded-3xl bg-white/60 text-xs font-semibold py-1 px-3"
        :class="`text-[${progressColor}]`"
      >
        2 Days Left
      </p>
      <div
        @click="onFavorite(project._id, project.isFavorite)"
        class="cursor-pointer"
      >
        <Icon
          icon="material-symbols:star-rate-rounded"
          width="24"
          v-if="project.isFavorite"
          class="text-yellow-500"
        />
        <Icon icon="ic:round-star-border" width="24" v-else />
      </div>
    </div>
  </div>
</template>
