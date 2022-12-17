<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import BoardService from "@/services/board.service";
import ColorSet from "@/components/ColorSet.vue";

const router = useRouter();

const isOpen = ref<boolean>(false);
function closeModal(): void {
  isOpen.value = false;
}
function openModal(): void {
  isOpen.value = true;
}

const payload = reactive({
  projectId: router.currentRoute.value.params.projectId,
  name: "",
  description: "",
  background: "",
  customBackground: "",
});

const chooseColor = (colorId: string) => {
  payload.background = colorId;
};

const checkInput = computed(() => {
  return payload.name.length > 0 && payload.background.length > 0;
});

const emits = defineEmits<{
  (e: "create-board"): void;
}>();

const createBoard = async () => {
  const { data } = await BoardService.createBoard(payload);
  emits("create-board");
  closeModal();
};
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #openBtn>
      <button
        @click="openModal"
        type="button"
        class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-2"
      >
        <Icon icon="ant-design:plus-outlined" width="20" />
        <span>Create new board</span>
      </button>
    </template>
    <template #title>
      <h1 class="text-2xl">Create new board</h1>
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
          v-model="payload.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter a name for this event"
          required
        />

        <label
          for="simple-search"
          class="text-sm font-medium text-gray-400 dark:text-gray-600 mt-5"
          >Description</label
        >
        <textarea
          type="text"
          v-model="payload.description"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter a description"
          required
        />
        <span class="text-sm text-gray-400 dark:text-gray-600 mt-5 mb-2"
          >Background color:</span
        >
        <ColorSet @choose="chooseColor($event)" />
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
          class="h-min inline-flex justify-center items-start rounded-md border border-transparent px-4 py-2 ml-5 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          :class="
            checkInput
              ? 'opacity-100 bg-blue-100 hover:bg-blue-200 cursor-pointer'
              : 'opacity-50 bg-blue-100 cursor-not-allowed'
          "
          @click="createBoard"
          :disabled="checkInput === false"
        >
          <Icon icon="tabler:layout-board" width="18" class="mr-1" /><span
            >Create board</span
          >
        </button>
      </div>
    </template>
  </Modal>
</template>
