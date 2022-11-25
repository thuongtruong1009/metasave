<script setup lang="ts">
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import { Switch } from "@headlessui/vue";

const isOpen = ref<boolean>(false);

function closeModal(): void {
  isOpen.value = false;
}
function openModal(): void {
  isOpen.value = true;
}

const isPublic = ref(false);

const templates = reactive([
  {
    id: "1",
    type: "Todo",
    desc: "Organize your daily tasks",
    icon: "mdi:format-list-bulleted",
  },
  {
    id: "2",
    type: "Kanban",
    desc: "Visualize your pipeline",
    icon: "mdi:format-list-bulleted",
  },
  {
    id: "2",
    type: "Dashboard",
    desc: "Visualize your collection data",
    icon: "mdi:format-list-bulleted",
  },
]);
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #openBtn>
      <button
        type="button"
        @click="openModal"
        class="flex items-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br hover:ring-2 focus:outline-none hover:ring-purple-300 dark:hover:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm p-2 pr-3"
      >
        <Icon icon="material-symbols:add" width="20" class="w-6" /><span
          >New</span
        >
      </button>
    </template>
    <template #title>
      <h1>Create new project</h1>
    </template>
    <template #content>
      <div>
        <div class="flex flex-col my-5">
          <span class="text-sm font-medium">Select the viewtype</span>
          <div class="grid grid-cols-3 gap-3">
            <button
              class="relative inline-flex items-center flex-grow justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group dark:hover:text-gray-900 focus:ring-2 focus:outline-none bg-gradient-to-br first-of-type:from-teal-300 first-of-type:to-lime-300 first-of-type:focus:ring-lime-200 from-cyan-300 via-cyan-400 to-cyan-500 focus:ring-cyan-300 last-of-type:from-red-200 last-of-type:via-red-300 last-of-type:to-yellow-200 last-of-type:focus:ring-red-200 dark:text-white"
              v-for="template in templates"
              :key="template.id"
            >
              <span
                class="relative w-full p-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              >
                {{ template.type }}
              </span>
            </button>
          </div>
        </div>

        <form class="flex flex-col items-start">
          <label
            for="simple-search"
            class="text-sm font-medium text-gray-400 dark:text-gray-600"
            >Name</label
          >
          <input
            type="text"
            id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter a name for this view"
            required
          />
        </form>
      </div>
    </template>
    <template #closeBtn>
      <div class="mt-4 flex justify-between items-center">
        <div class="text-xs font-medium flex gap-2 items-center">
          <Switch
            v-model="isPublic"
            :class="isPublic ? 'bg-purple-900' : 'bg-purple-700'"
            class="relative inline-flex w-14 h-6 shrink-0 cursor-pointer shadow-lg rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span
              aria-hidden="true"
              :class="isPublic ? 'translate-x-8' : 'translate-x-0'"
              class="pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            />
          </Switch>
          <span v-html="isPublic ? 'private' : 'public'"></span>
        </div>

        <button
          type="button"
          class="h-min inline-flex ml-5 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="closeModal"
        >
          Create view
        </button>
      </div>
    </template>
  </Modal>
</template>
