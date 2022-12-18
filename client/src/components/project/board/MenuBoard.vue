<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import BoardService from "@/services/board.service";

const router = useRouter();

let boards = reactive([]);

const selectedBoard = ref();

watchEffect(async () => {
  const { data } = await BoardService.getListBoardsName(
    router.currentRoute.value.params.projectId
  );
  boards = data;
  selectedBoard.value = boards[0];
});
</script>

<template>
  <div class="w-max z-10">
    <Listbox v-model="selectedBoard">
      <div class="relative">
        <ListboxButton
          class="relative flex items-center w-full cursor-pointer rounded-lg bg-white hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-300 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <Icon icon="octicon:project-roadmap-24" />
          <span class="block truncate ml-1.5">{{ selectedBoard?.name }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <Icon
              icon="heroicons:chevron-up-down-20-solid"
              class="h-5 w-5 text-gray-400"
            />
          </span>
        </ListboxButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-75 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-110 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-75 opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-max overflow-auto rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in boards"
              :key="person.name"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ person.name }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <Icon icon="material-symbols:check-small-rounded" />
                </span>
              </li>
            </ListboxOption>

            <li class="p-1">
              <button
                class="bg-amber-100 text-amber-900 p-2 flex justify-center items-start gap-1 w-full rounded-lg"
              >
                <Icon icon="gridicons:create" width="18" />
                <span>New board</span>
              </button>
            </li>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
