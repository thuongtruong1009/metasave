<script setup lang="ts">
import { onMounted, ref } from "vue";
import SettingService from "@/services/setting.service";

const colors = ref<Array<string>>([]);

onMounted(async () => {
  const { data } = await SettingService.getColorSet();
  colors.value = data;
});

const emit = defineEmits<{
  (event: "choose", colorId: string): void;
}>();

const chooseColor = (e: Event, colorId: string) => {
  e.preventDefault();
  emit("choose", colorId);
};
</script>

<template>
  <ul class="flex justify-between">
    <li v-for="color in colors" :key="color._id">
      <button
        type="button"
        class="rounded-full w-5 h-5 cursor-pointer mx-2 hover:shadow-md hover:scale-110 duration-200 ease-linear focus:ring-2 focus:ring-purple-500"
        :style="{ backgroundColor: color.name }"
        @click="chooseColor($event, color._id)"
      ></button>
    </li>
  </ul>
</template>
