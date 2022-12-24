<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import BoardService from "@/services/board.service";

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
  icon: "",
});

const checkInput = computed(() => {
  return payload.name.length > 0;
});

const emits = defineEmits<{
  (e: "create-table"): void;
}>();

const createBoard = async () => {
  const { data } = await BoardService.createBoard(payload);
  emits("create-table");
  closeModal();
};
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #openBtn>
      <button
        @click="openModal"
        type="button"
        class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center gap-2"
      >
        <Icon icon="ant-design:plus-outlined" width="20" />
        <span>Create new table</span>
      </button>
    </template>
    <template #title>
      <h1 class="text-2xl">Create new event</h1>
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
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter a name for this event"
          required
        />

        <label
          for="simple-search"
          class="text-sm font-medium text-gray-400 dark:text-gray-600"
          >Location</label
        >
        <input
          type="text"
          class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter a address link or location"
          required
        />

        <label
          for="simple-search"
          class="text-sm font-medium text-gray-400 dark:text-gray-600"
          >Description</label
        >
        <textarea
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter a description"
          required
        />
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
          <Icon
            icon="material-symbols:event-available-outline-rounded"
            width="18"
            class="mr-1"
          /><span>Create event</span>
        </button>
      </div>
    </template>
  </Modal>
</template>
