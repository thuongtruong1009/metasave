<script setup lang="ts">
import { onMounted, ref } from "vue";
import SettingService from "@/services/setting.service";

const colors = ref<Array<any>>([]);

onMounted(async () => {
  const { data } = await SettingService.getColorSet();
  colors.value = data;
});

const emit = defineEmits<{
  (event: "choose", colorId: string): void;
}>();

const props = defineProps<{
  currentColor?: string | undefined;
}>();

const currentColor = ref<string | undefined>(props.currentColor);

const chooseColor = (e: Event, colorId: string) => {
  e.preventDefault();
  emit("choose", colorId);
  currentColor.value = colorId;
};
</script>

<template>
  <ul class="flex flex-wrap">
    <li v-for="color in colors" :key="color._id">
      <button
        type="button"
        class="rounded-full w-5 h-5 cursor-pointer mx-2 hover:shadow-md hover:scale-110 duration-200 ease-linear"
        :style="{ backgroundColor: color.name }"
        :class="currentColor === color._id ? 'ring-2 ring-purple-500' : ''"
        @click="chooseColor($event, color._id)"
      ></button>
    </li>
  </ul>
</template>
