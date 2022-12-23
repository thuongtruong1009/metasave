<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import CardService from "@/services/card.service";
import { getRandomEmoji } from "@/helpers/kanban";
import { ICard } from "@/types";
import TagSet from "@/components/project/TagSet.vue";

const props = defineProps<{
  card: {
    boardId: string;
    columnId: string;
  };
}>();

const isEdit = ref<boolean>(false);
const onEdit = () => {
  isEdit.value = !isEdit.value;
};

const input = ref<string>("");
const tagId = ref<string>("");
const updateTag = (id: string) => {
  tagId.value = id;
};

const emits = defineEmits<{
  (event: "create-card", args: string): void;
}>();

const handleCreateCard = async () => {
  const newCard: ICard = {
    boardId: props.card.boardId,
    text: input.value,
    status: Number(props.card.columnId),
    icon: getRandomEmoji(),
    tagId: tagId.value,
  };
  await CardService.createCard(newCard);
  emits("create-card", input.value);
  input.value = "";
};
</script>

<template>
  <div class="my-2 mx-4">
    <div v-if="isEdit">
      <div class="flex mb-2">
        <input
          type="search"
          v-model="input"
          class="w-full p-2 mr-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Title for this card..."
          required
          @keydown.enter="handleCreateCard"
        />
        <TagSet @update-tag="updateTag($event)" />
      </div>
      <div class="flex items-center">
        <button
          type="button"
          class="text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-md text-sm px-4 py-1.5 dark:bg-purple-600 dark:hover:bg-purple-700"
          @click="handleCreateCard"
        >
          Create
        </button>
        <button
          type="button"
          class="text-gray-400 hover:text-gray-700 font-medium text-sm p-2 dark:text-white"
          @click="onEdit"
        >
          Cancel
        </button>
      </div>
    </div>
    <div v-else>
      <button
        type="button"
        @click="onEdit"
        class="text-gray-500 bg-white hover:bg-gray-100 font-medium rounded-md text-sm p-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 flex items-center gap-1"
      >
        <Icon icon="material-symbols:add" width="20" />
        <span>Add new card</span>
      </button>
    </div>
  </div>
</template>
