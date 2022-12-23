<script setup lang="ts">
import { ref, watchEffect } from "vue";
import useCardStore from "@/store/card";
import { Draggable } from "vue3-smooth-dnd";
import { Icon } from "@iconify/vue";
import CardService from "@/services/card.service";
import SpinLoading from "@/components/icons/SpinLoading.vue";
import Tag from "@/components/project/board/Tag.vue";

const cardStore = useCardStore();

const props = defineProps<{
  item: {
    _id: string;
    loading: boolean;
    icon: string;
    text: string;
    tagId: string;
  };
}>();

const isOpenMenu = ref(false);
const onOpenMenu = () => {
  isOpenMenu.value = true;
};

const onCloseMenu = () => {
  isOpenMenu.value = false;
};

const emits = defineEmits<{
  (event: "delete-card"): void;
}>();

const deleteCard = async () => {
  await CardService.deleteCard(props.item._id);
  emits("delete-card");
};
</script>

<template>
  <Draggable v-if="props.item">
    <div
      class="card_item cursor-move my-2 mx-4 rounded-lg shadow-md bg-gray-100 dark:bg-gray-500 border-transparent relative border-2 hover:border-primary"
    >
      <div
        v-if="props.item.loading"
        class="flex bg-gray-50 text-gray-500/50 font-semibold text-xs dark:text-gray-200 dark:bg-gray-900 px-4 py-1 rounded-t-lg"
      >
        <SpinLoading />
        <span>Saving...</span>
      </div>
      <div
        class="p-2 flex justify-between"
        @mousemove="onOpenMenu"
        @mouseleave="onCloseMenu"
      >
        <div class="flex">
          <div
            class="rounded-lg bg-purple-500 shadow-lg w-10 h-10 flex justify-center items-center"
          >
            <span>{{ props.item.icon }}</span>
          </div>
          <div class="flex flex-col justify-between gap-3 mx-3">
            <h3 class="">{{ props.item.text }}</h3>
            <Tag :tagId="props.item.tagId" />
          </div>
        </div>
        <Transition name="slide-fade">
          <div class="flex flex-col justify-between" v-if="isOpenMenu">
            <span
              @click="cardStore.getCardById(props.item._id)"
              class="cursor-pointer w-7 h-7 flex justify-center items-center rounded-full opacity-60 hover:opacity-100 hover:bg-gray-200"
              ><Icon icon="material-symbols:edit"
            /></span>
            <span
              @click="deleteCard"
              class="cursor-pointer w-7 h-7 flex justify-center items-center rounded-full opacity-60 hover:opacity-100 hover:bg-gray-200"
              ><Icon icon="material-symbols:delete-outline-rounded"
            /></span>
          </div>
        </Transition>
      </div>
    </div>
  </Draggable>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
