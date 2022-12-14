<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  attendent: {
    _id: string;
    username: string;
    avatar: string;
  };
}>();

const emits = defineEmits<{
  (event: "delete-attendent"): void;
}>();

const listenerDelete = () => {
  emits("delete-attendent");
};
</script>

<template>
  <div
    class="group relative rounded-2xl border border-purple-50 shadow-md bg-purple-100 hover:bg-purple-200"
  >
    <span
      @click="listenerDelete"
      class="hidden group-hover:block absolute -top-1.5 -right-1.5 bg-white border cursor-pointer rounded-full p-0.5 hover:shadow-md"
      ><Icon icon="charm:cross"
    /></span>
    <div class="flex items-center">
      <img
        :src="props.attendent.avatar"
        alt="attendent_avatar_img"
        class="w-8 h-8 rounded-full shadow-md"
      />
      <p class="mx-1">{{ props.attendent.username }}</p>
    </div>
  </div>
</template>
