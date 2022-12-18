<script setup lang="ts">
import { ref } from "vue";
import { Draggable } from "vue3-smooth-dnd";
import { Icon } from "@iconify/vue";
import CardService from "@/services/card.service";
import SpinLoading from "@/components/icons/SpinLoading.vue";

const props = defineProps<{
  item: {
    _id: string;
    loading: boolean;
    icon: string;
    text: string;
  };
}>();

const isOpenMenu = ref(false);
const onOpenMenu = () => {
  isOpenMenu.value = !isOpenMenu.value;
};

const emits = defineEmits<{
  (event: "delete-card"): void;
}>();

const deleteCard = async () => {
  await CardService.deleteCard(props.item._id);
  emits("delete-card");
  onOpenMenu();
};
</script>

<template>
  <Draggable v-if="props.item">
    <div
      class="card_item cursor-move my-2 mx-4 rounded-lg shadow-md bg-gray-100 border-transparent relative dark:bg-gray-800 border-2 hover:border-primary"
    >
      <div
        v-if="props.item.loading"
        class="flex bg-gray-50 text-gray-500/50 font-semibold text-xs dark:text-gray-200 dark:bg-gray-900 px-4 py-1 rounded-t-lg"
      >
        <SpinLoading />
        <span>Saving...</span>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start">
          <div
            class="rounded-lg bg-primary p-2 w-max h-max inline-block box-content"
          >
            <p>{{ props.item.icon }}</p>
          </div>

          <Icon icon="mdi:tag-multiple" />

          <span
            @click="onOpenMenu"
            class="card_item_option--icon cursor-pointer hidden w-7 h-7 flex text-center rounded-full hover:bg-gray-300"
            >⋯</span
          >
          <div
            class="card_item_option--menu absolute top-0 right-0"
            v-if="isOpenMenu"
          >
            <Transition>
              <ul
                class="absolute top-10 right-5 w-max bg-white rounded-lg shadow-lg p-2 text-left text-sm cursor-pointer"
              >
                <li>Edit</li>
                <li>Copy card link</li>
                <li @click="deleteCard">Remove from column</li>
              </ul>
            </Transition>
          </div>
        </div>
        <p>{{ props.item.text }}</p>
      </div>
    </div>
  </Draggable>
</template>

<style scoped>
.card_item:hover .card_item_option--icon {
  display: block;
}
</style>
