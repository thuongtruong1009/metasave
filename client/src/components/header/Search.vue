<script setup>
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { Icon } from "@iconify/vue";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
];

let selected = ref("");
let query = ref("");

let filteredPeople = computed(() =>
  query.value === ""
    ? people
    : people.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const isPlaceholder = computed(() => query.value === "");
</script>

<template>
  <button
    aria-label="Open search"
    class="relative flex justify-between items-center max-w-96 w-96 h-10 w-full text-gray-400 py-2 px-5 bg-gradient-to-b from-white to-gray-200 outline-none group shadow-input focus:outline-none hover:shadow-md hover:bg-white focus:shadow-md rounded-full transition-all duration-200 ease-in-out z-10"
    title="Open search"
    type="button"
  >
    <div>
      <Icon icon="ic:baseline-search" width="24" />
    </div>
    <Combobox v-model="selected">
      <ComboboxInput
        class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-transparent z-20 focus:ring-0"
        :displayValue="(person) => person.name"
        @change="query = $event.target.value"
      />
      <span
        class="absolute inset-x-0 right-1/3 text-sm z-10"
        v-if="isPlaceholder"
        >Search the user, project</span
      >
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute left-0 top-16 max-h-60 w-full overflow-auto rounded-xl bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 text-left focus:outline-none sm:text-sm"
        >
          <div
            v-if="filteredPeople.length === 0 && query !== ''"
            class="relative cursor-default py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="person in filteredPeople"
            as="template"
            :key="person.id"
            :value="person"
            v-slot="{ selected, active }"
          >
            <li
              class="relative cursor-pointer py-2 pl-10 pr-4"
              :class="{
                'bg-purple-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ person.name }}
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </Combobox>
    <div
      class="block sm:hidden flex-grow mt-4 leading-none text-grey-700 truncate text-left"
    >
      Search
    </div>
    <div
      class="hidden xl:flex gap-1 text-xs text-gray-500 tracking-tighter max-h-full"
    >
      <kbd
        class="rounded-md w-10 h-min bg-gradient-to-tl from-gray-200 to-gray-200 border-gray-300 border-b-2 shadow-md"
      >
        <span
          class="flex items-center justify-center w-full h-min p-1 rounded-md border-t border-l border-r border-white leading-none"
        >
          <span>Ctrl</span>
        </span>
      </kbd>
      <kbd
        class="rounded-md w-8 h-min bg-gradient-to-tl from-gray-200 to-gray-200 border-gray-300 border-b-2 shadow-md"
      >
        <span
          class="flex items-center justify-center w-full h-min p-1 rounded-md border-t border-l border-r border-white leading-none"
        >
          <span>K</span>
        </span>
      </kbd>
    </div>
  </button>
</template>
