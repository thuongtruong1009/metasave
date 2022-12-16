<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps<{
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
}>();

const emits = defineEmits<{
  (event: "delete-user"): void;
}>();

const listenerDelete = () => {
  emits("delete-user");
};
</script>

<template>
  <div
    class="group relative rounded-2xl m-1 border border-purple-50 shadow-md bg-purple-100 hover:bg-purple-200"
  >
    <span
      @click="listenerDelete"
      class="hidden group-hover:block absolute -top-1.5 -right-1.5 bg-white border cursor-pointer rounded-full p-0.5 hover:shadow-md"
      ><Icon icon="charm:cross"
    /></span>
    <div class="flex items-center">
      <img
        :src="props.user.avatar"
        alt="attendent_avatar_img"
        class="w-6 h-6 rounded-full shadow-md"
      />
      <p class="mx-1 text-sm">{{ props.user.username }}</p>
    </div>
  </div>
</template>
