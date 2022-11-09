<script setup lang="ts">
import { Draggable } from "vue3-smooth-dnd";
import { TagIcon } from "@heroicons/vue/20/solid";

defineProps<{
  item: {
    loading: boolean;
    icon: string;
    data: string;
  };
}>();
</script>

<template>
  <Draggable v-if="item">
    <div
      class="card_item cursor-move my-2 mx-4 rounded-lg shadow-md bg-gray-100 border-transparent relative dark:bg-gray-800 border-2 hover:border-primary"
    >
      <div
        v-if="item.loading"
        class="flex space-x-2 bg-gray-50 text-gray-900 dark:text-gray-200 dark:bg-gray-900 px-4 py-2 rounded-t-lg"
      >
        <span>Processing...</span>
      </div>
      <div class="p-4">
        <div class="flex justify-between items-start">
          <div
            class="rounded-lg bg-primary p-2 w-max h-max inline-block box-content"
          >
            <p>{{ item.icon }}</p>
          </div>

          <TagIcon class="h-5 w-5" aria-hidden="true" />

          <span
            class="card_item_option--icon cursor-pointer hidden w-7 h-7 flex text-center rounded-full hover:bg-gray-300"
            >⋯</span
          >
          <div class="card_item_option--menu hidden absolute top-0 right-0">
            <Transition>
              <ul
                class="absolute top-10 right-5 w-max bg-white rounded-lg shadow-lg p-2 text-left text-sm cursor-pointer"
              >
                <li>Edit</li>
                <li>Copy card link</li>
                <li>Remove from column</li>
              </ul>
            </Transition>
          </div>
        </div>
        <p>{{ item.data }}</p>
      </div>
    </div>
  </Draggable>
</template>

<style scoped>
.card_item:hover .card_item_option--icon {
  display: block;
}
.card_item_option--icon:hover ~ .card_item_option--menu {
  display: block;
}
</style>
