<script setup lang="ts">
import { ref, reactive, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Switch } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import EventService from "@/services/event.service";
import Modal from "@/components/Modal.vue";
import HourSelect from "./HourSelect.vue";
import ColorSet from "@/components/ColorSet.vue";
import TagInput from "@/components/TagInput.vue";
import { getCurrentDate, getDateFormat, getISOFormat } from "@/helpers/date";
import { IUserTag } from "@/types";

const router = useRouter();

const isOpen = ref<boolean>(false);
function closeModal(): void {
  isOpen.value = false;
}
function openModal(): void {
  isOpen.value = true;
}
const payload: any = reactive({
  title: "",
  description: "",
  attendees: [],
  time: {
    start: "",
    end: "",
    date: getDateFormat(
      getCurrentDate(new Date()).year,
      getCurrentDate(new Date()).month,
      getCurrentDate(new Date()).day
    ),
  },
  location: "",
  colorId: "",
});

const chooseColor = (colorId: string) => {
  payload.colorId = colorId;
};

const addAttendees = (attendees: any) => {
  payload.attendees = attendees;
};

const getHourStart = (hour: string) => {
  payload.time.start = getISOFormat(payload.time.date, hour);
};
const getHourEnd = (hour: string) => {
  payload.time.end = getISOFormat(payload.time.date, hour);
};

const checkInput = computed(
  () =>
    payload.title.length > 0 &&
    payload.time.date !== "" &&
    payload.colorId !== ""
);

const emits = defineEmits<{
  (e: "created"): void;
}>();
const handleCreateProject = async () => {
  await EventService.createEvent(payload);
  emits("created");
  closeModal();
};
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #openBtn>
      <div @click="openModal" class="w-full h-full"></div>
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
          v-model="payload.title"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter a name for this event"
          required
        />

        <div
          class="my-3 mt-5 flex items-center gap-5 text-sm text-gray-400 dark:text-gray-600"
        >
          <span>Choose color:</span>
          <ColorSet @choose="chooseColor($event)" />
        </div>

        <label
          for="simple-search"
          class="text-sm font-medium text-gray-400 dark:text-gray-600"
          >Location</label
        >
        <input
          type="text"
          v-model="payload.location"
          class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          placeholder="Enter a address link or location"
          required
        />

        <div class="grid grid-cols-2 w-full my-3">
          <div>
            <input
              type="date"
              v-model="payload.time.date"
              name="date"
              class="text-blue-700 rounded-lg focus:ring-0 w-full"
            />
          </div>

          <div class="flex justify-center items-center gap-3">
            <HourSelect @select="getHourStart($event)" />
            <span class="text-gray-400 dark:text-gray-600">to</span>
            <HourSelect @select="getHourEnd($event)" />
          </div>
        </div>

        <div>
          <span class="text-gray-400 dark:text-gray-600 text-sm font-medium"
            >Attendees</span
          >
          <TagInput
            :tags="payload.attendees"
            @update-tag="addAttendees($event)"
          />
        </div>

        <label
          for="simple-search"
          class="text-sm font-medium text-gray-400 dark:text-gray-600"
          >Description</label
        >
        <textarea
          type="text"
          v-model="payload.description"
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
          @click="handleCreateProject"
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
