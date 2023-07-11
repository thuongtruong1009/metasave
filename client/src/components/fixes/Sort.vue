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

const options = [
  { name: "Default (all)" },
  { name: "Alphabet (a-z)" },
  { name: "Created (oldest)" },
  { name: "Updated (latest)" },
  { name: "Access (private)" },
];
const selectedOption = ref(options[0]);
</script>

<template>
  <Listbox v-model="selectedOption" class="w-40">
    <div class="relative">
      <ListboxButton
        class="w-full flex items-center hover:bg-purple-50 rounded-lg"
      >
        <Icon
          icon="ph:sort-ascending-duotone"
          height="40"
          class="text-gray-500"
        />
        <div class="relative w-full text-left pl-1">
          <span class="block text-xs font-medium text-gray-400">Sort by:</span>
          <span class="block truncate text-sm font-semibold">{{
            selectedOption.name
          }}</span>
          <span class="absolute bottom-0 right-0 flex items-center">
            <Icon icon="mdi:triangle-small-down" width="20" />
          </span>
        </div>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 right-0 max-h-60 w-max overflow-auto rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option.name"
            :value="option"
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
                >{{ option.name }}</span
              >
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
