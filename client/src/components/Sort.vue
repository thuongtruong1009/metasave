<script setup>
import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { Icon } from "@iconify/vue";

const people = [
  { name: "Default (all)" },
  { name: "Alphabet key" },
  { name: "Created init" },
  { name: "Updated recent" },
  { name: "Access modified" },
];
const selectedPerson = ref(people[0]);
</script>

<template>
  <Listbox v-model="selectedPerson" class="w-36">
    <div class="relative">
      <ListboxButton
        class="relative w-full text-left hover:bg-purple-50 rounded-lg px-3"
      >
        <span class="block text-xs font-medium text-gray-400">Sort by:</span>
        <span class="block truncate text-sm font-semibold">{{
          selectedPerson.name
        }}</span>
        <span class="absolute bottom-0 right-0 flex items-center">
          <Icon icon="mdi:triangle-small-down" width="20" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 right-0 max-h-60 w-52 overflow-auto rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="person in people"
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
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <Icon icon="material-symbols:check-small-rounded" width="22" />
              </span>
              <span
                :class="[
                  selected ? 'font-semibold text-amber-600' : 'font-normal',
                  'block truncate',
                ]"
                >{{ person.name }}</span
              >
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
