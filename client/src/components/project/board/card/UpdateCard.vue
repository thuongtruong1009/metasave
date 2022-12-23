<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import CardService from "@/services/card.service";
import useCardStore from "@/store/card";
import useTagStore from "@/store/tag";
import Tag from "@/components/project/board/Tag.vue";
import TagSet from "@/components/project/TagSet.vue";
import StatusSet from "@/components/project/board/card/StatusSet.vue";
import IconSet from "@/components/project/board/IconSet.vue";

const cardStore = useCardStore();
const tagStore = useTagStore();

const payload = reactive({
  text: cardStore.getCardStore.text,
  icon: cardStore.getCardStore.icon,
  tagId: cardStore.getCardStore.tagId,
  status: cardStore.getCardStore.status,
});

const isOpen = ref<boolean>(cardStore.isOpenCardModal);
function closeModal(): void {
  isOpen.value = false;
}
function openModal(): void {
  isOpen.value = true;
}

const updateStatus = (status: number) => {
  payload.status = status;
};

const updateIcon = (icon: string) => {
  payload.icon = icon;
};

const updateTag = (tagId: string) => {
  payload.tagId = tagId;
};

const updateCard = async () => {
  await CardService.updateCard(cardStore.getCardStore._id, payload);
  cardStore.resetState();
};
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #title>
      <h1 class="text-2xl">Update card</h1>
    </template>
    <template #closeBtn>
      <button
        type="button"
        @click="cardStore.resetState"
        class="hover:rotate-90 duration-200 ease-linear inline-flex"
      >
        <Icon icon="mdi:close" width="20" />
      </button>
    </template>
    <template #content>
      <form class="flex flex-col items-start my-5 w-96">
        <label
          for="simple-search"
          class="text-sm font-medium text-gray-400 dark:text-gray-600"
          >Text</label
        >
        <div class="flex justify-between w-full">
          <input
            type="text"
            v-model="payload.text"
            class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="Enter text for this card"
            required
          />
          <IconSet
            :currentIcon="cardStore.getCardStore.icon"
            @update-icon="updateIcon($event)"
          />
        </div>
        <div class="flex justify-between w-full my-3">
          <div class="flex items-center">
            <span class="text-sm font-medium text-gray-500/50 mr-2"
              >Status:</span
            >
            <StatusSet
              :currentStatusId="cardStore.getCardStore.status"
              @update-status="updateStatus($event)"
            />
          </div>

          <div class="flex items-center">
            <span class="text-sm font-medium text-gray-500/50 mr-2">Tag:</span>
            <Tag
              :tagId="cardStore.getCardStore.tagId"
              @update-tag="updateTag($event)"
              v-if="cardStore.getCardStore.tagId !== tagStore.getDefaultTagId"
            />
            <TagSet />
          </div>
        </div>
      </form>
    </template>
    <template #doneBtn>
      <div class="mt-5 flex justify-end items-center">
        <button
          type="button"
          class="h-min inline-flex text-sm font-medium text-gray-400 cursor-pointer"
          @click="closeModal"
        >
          Cancel
        </button>

        <button
          type="button"
          @click="updateCard"
          class="h-min inline-flex justify-center items-start rounded-md border border-transparent px-4 py-2 ml-5 text-sm font-medium text-blue-900 opacity-100 bg-blue-100 hover:bg-blue-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <Icon icon="ic:baseline-update" width="18" class="mr-1" /><span
            >Update</span
          >
        </button>
      </div>
    </template>
  </Modal>
</template>

<!-- <style lang="scss" scoped>
form {
  .field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    span {
      font-size: 0.875rem;
      font-weight: 500;
      color: #4b5563;
    }
  }
}
</style> -->
