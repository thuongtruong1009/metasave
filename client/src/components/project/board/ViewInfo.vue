<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import BoardService from "@/services/board.service";
import { IBoardInfoPayget } from "@/types";
import StaticGroupCard from "@/components/project/StaticGroupCard.vue";
import { getCurrentDate, getTimeFormat } from "@/helpers/date";

const router = useRouter();

let boardId = router.currentRoute.value.params.boardId as string;
watch(
  () => router.currentRoute.value.params.boardId,
  (newVal) => {
    boardId = newVal as string;
  }
);

let payget = reactive<IBoardInfoPayget>({
  board: {
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
  },
  info: {
    total: {} as any,
    groupCardByTag: [],
    groupCardByStatus: [],
  },
});

const getBoardInfo = async () => {
  const { data } = await BoardService.getInfoBoard(boardId);
  payget.board = data.board;
  payget.info = data.info;
};

const isOpen = ref<boolean>(false);
function closeModal(): void {
  isOpen.value = false;
}
function openModal(): void {
  getBoardInfo();
  isOpen.value = true;
}

const checkInput = computed(() => payget.board.name.length > 0);

const updateBoard = async () => {
  if (checkInput.value) {
    const { data } = await BoardService.updateBoard(boardId, payget.board);
    closeModal();
  }
};

const formatTimeStamp = (time: string) => {
  return getTimeFormat(
    getCurrentDate(time).year,
    getCurrentDate(time).month,
    getCurrentDate(time).day,
    getCurrentDate(time).hour.split(":")[0],
    getCurrentDate(time).minute
  );
};
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #openBtn>
      <button
        @click="openModal"
        type="button"
        class="text-gray-500 bg-white hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-300 shadow-md font-medium rounded-lg text-sm p-2"
      >
        <Icon icon="uil:map-marker-info" width="20" />
      </button>
    </template>
    <template #title>
      <h1 class="text-2xl">Board information</h1>
    </template>
    <template #closeBtn>
      <button
        type="button"
        @click="closeModal"
        class="hover:rotate-90 duration-200 ease-linear inline-flex"
      >
        <Icon icon="mdi:close" width="20" />
      </button>
    </template>
    <template #content>
      <form class="flex flex-col items-start my-5 w-128">
        <label
          for="simple-search"
          class="text-sm font-medium text-gray-400 dark:text-gray-600"
          >Name</label
        >
        <input
          type="text"
          v-model="payget.board.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter name for this board"
          required
        />

        <label
          for="simple-search"
          class="text-sm font-medium text-gray-400 dark:text-gray-600 mt-5"
          >Description</label
        >
        <textarea
          type="text"
          v-model="payget.board.description"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter description for this board"
          required
        />
        <StaticGroupCard :data="payget.info" />
        <div
          class="flex justify-between items-center italic text-xs font-medium text-gray-400 w-full"
        >
          <span>Created at: {{ formatTimeStamp(payget.board.createdAt) }}</span>
          <span>Updated at: {{ formatTimeStamp(payget.board.updatedAt) }}</span>
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
          @click="updateBoard"
          class="h-min inline-flex justify-center items-start rounded-md border border-transparent px-4 py-2 ml-5 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          :class="
            checkInput
              ? 'opacity-100 bg-blue-100 hover:bg-blue-200 cursor-pointer'
              : 'opacity-50 bg-blue-100 cursor-not-allowed'
          "
          :disabled="checkInput === false"
        >
          <Icon icon="ic:baseline-update" width="18" class="mr-1" /><span
            >Update board</span
          >
        </button>
      </div>
    </template>
  </Modal>
</template>
