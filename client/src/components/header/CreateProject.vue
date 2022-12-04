<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import Modal from "@/components/Modal.vue";
import { Switch } from "@headlessui/vue";
import ProjectService from "@/services/project.service";

const router = useRouter();

const isOpen = ref<boolean>(false);
function closeModal(): void {
  isOpen.value = false;
}
function openModal(): void {
  isOpen.value = true;
}

const payload = reactive({
  categoryId: "",
  name: "",
  description: "",
  access: true,
});

const checkInput = computed(
  () => payload.name.length > 0 && payload.categoryId !== ""
);

const templates = reactive([
  {
    id: "1",
    type: "Todo",
    desc: "Organize your daily tasks",
    icon: "material-symbols:format-list-bulleted-rounded",
  },
  {
    id: "2",
    type: "Kanban",
    desc: "Visualize your pipeline",
    icon: "ci:trello",
  },
  {
    id: "3",
    type: "Dashboard",
    desc: "Visualize your collection data",
    icon: "material-symbols:space-dashboard-rounded",
  },
]);

const handleAccess = computed(() => {
  return payload.access ? "public" : "private";
});

const handleCreateProject = async () => {
  const res = await ProjectService.createProject({
    name: payload.name,
    description: payload.description,
    access: handleAccess.value,
    categoryId: payload.categoryId,
  });
  closeModal();
  router.push(`/project/${res.data._id}`);
};
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
      <h1 class="text-2xl">Create new project</h1>
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
      <div>
        <div class="flex flex-col my-5">
          <span
            class="text-sm font-medium mb-2 text-gray-400 dark:text-gray-600"
            >Select the viewtype</span
          >
          <div class="grid grid-cols-3 gap-3">
            <div
              class="relative inline-flex items-center flex-grow justify-center cursor-pointer p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group dark:hover:text-gray-900 focus:ring-2 focus:outline-none bg-gradient-to-br first-of-type:from-teal-300 first-of-type:to-lime-300 first-of-type:focus:ring-lime-200 from-cyan-300 via-cyan-400 to-cyan-500 focus:ring-cyan-300 last-of-type:from-red-200 last-of-type:via-red-300 last-of-type:to-yellow-200 last-of-type:focus:ring-red-200 dark:text-white"
              v-for="template in templates"
              :key="template.id"
              @click="payload.categoryId = template.id"
            >
              <div
                class="relative w-full p-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                :class="
                  payload.categoryId === template.id
                    ? 'bg-opacity-0 text-white'
                    : 'bg-opacity-100'
                "
              >
                <div class="flex items-center gap-2">
                  <span><Icon :icon="template.icon" width="20" /></span>
                  <h3 class="font-medium text-xl">{{ template.type }}</h3>
                </div>
                <p class="whitespace-nowrap text-gray-500 mt-2">
                  {{ template.desc }}
                </p>
              </div>
            </div>
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
            v-model="payload.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="Enter a name for this view"
            required
          />
          <label
            for="simple-search"
            class="text-sm font-medium text-gray-400 dark:text-gray-600 mt-5"
            >Description</label
          >
          <input
            type="text"
            v-model="payload.description"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
            placeholder="Enter a name for this view"
            required
          />
        </form>
      </div>
    </template>
    <template #doneBtn>
      <div class="mt-4 flex justify-between items-center">
        <div class="text-xs font-medium flex gap-2 items-center">
          <Switch
            v-model="payload.access"
            :class="payload.access ? 'bg-purple-900' : 'bg-purple-600'"
            class="relative inline-flex w-14 h-6 shrink-0 cursor-pointer shadow-lg rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <span
              aria-hidden="true"
              :class="payload.access ? 'translate-x-8' : 'translate-x-0'"
              class="pointer-events-none inline-block w-5 h-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            />
          </Switch>
          <span v-html="payload.access ? 'public' : 'private'"></span>
        </div>

        <button
          type="button"
          class="h-min inline-flex justify-center items-start rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          :class="
            checkInput
              ? 'opacity-100 bg-blue-100 hover:bg-blue-200 cursor-pointer'
              : 'opacity-50 bg-blue-100 cursor-not-allowed'
          "
          @click="handleCreateProject"
          :disabled="checkInput === false"
        >
          <Icon
            icon="ic:outline-create-new-folder"
            width="20"
            class="mr-1"
          /><span>Create view</span>
        </button>
      </div>
    </template>
  </Modal>
</template>
