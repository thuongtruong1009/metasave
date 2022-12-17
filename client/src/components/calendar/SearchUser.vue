<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { IUserTag } from "@/types";

const emits = defineEmits<{
  (event: "add-user", tag: IUserTag): void;
}>();

// sample data for testing, replace with list user from search query db
const people = [
  {
    _id: "1",
    username: "Wade Cooper",
    avatar:
      "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
  },
  {
    _id: "2",
    username: "Arlene Mccoy",
    avatar:
      "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
  },
];

let selectedId = ref<any>();
let query = ref<string>("");

let filteredPeople = computed(() =>
  query.value === ""
    ? people
    : people.filter((person) =>
        person.username
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const addTag = (tag: IUserTag): void => {
  emits("add-user", tag);
  selectedId.value = "";
};
</script>

<template>
  <Combobox v-model="selectedId">
    <ComboboxInput
      class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-transparent z-20 focus:ring-0"
      @change="query = $event.target.value"
      @keydown.enter="addTag(selectedId)"
    />
    <TransitionRoot
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      @after-leave="query = ''"
    >
      <ComboboxOptions
        class="absolute left-0 top-1/4 max-h-60 w-11/12 mx-5 overflow-auto rounded-xl bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 text-left focus:outline-none sm:text-sm"
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
          :key="person._id"
          :value="person"
          v-slot="{ selectedId, active }"
        >
          <li
            class="relative cursor-pointer py-2 pl-10 pr-4 flex items-center gap-2"
            :class="[
              {
                'bg-purple-600 text-white': active,
              },
              { 'text-gray-900': !active },
              [selectedId === person] ? 'text-purple-600 bg-white' : '',
            ]"
            @click="addTag(person)"
          >
            <img
              :src="person.avatar"
              alt="user_avatar_img"
              class="w-6 h-6 rounded-full shadow-md"
            />
            <span
              class="block truncate"
              :class="{ 'font-medium': selectedId, 'font-normal': !selectedId }"
            >
              {{ person.username }}
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </TransitionRoot>
  </Combobox>
</template>
