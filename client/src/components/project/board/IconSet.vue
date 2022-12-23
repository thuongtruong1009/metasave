<script setup lang="ts">
import { ref, watchEffect } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import { emojis } from "@/shared/emoji";

const props = defineProps<{
  currentIcon: string;
}>();

const currentIcon = ref<string>(props.currentIcon);

const emit = defineEmits<{
  (event: "update-icon", statusId: string): void;
}>();

watchEffect(async () => {
  emit("update-icon", currentIcon.value);
});
</script>

<template>
  <div class="w-min">
    <Listbox v-model="currentIcon">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-pointer hover:bg-purple-100 rounded-lg bg-white py-2 pl-3 pr-7 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{
            emojis.find((i) => i === currentIcon)
          }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500"
          >
            <Icon icon="fluent:triangle-down-12-filled" width="10" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute my-2 max-h-36 w-72 -bottom-20 right-full mr-2 z-10 overflow-auto flex flex-wrap rounded-lg bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="(emoji, i) in emojis"
              :key="i"
              :value="emoji"
              as="template"
            >
              <li
                :class="[
                  selected
                    ? 'bg-purple-200 border-purple-400 shadow-md'
                    : 'border-transparent',
                  'relative cursor-pointer p-2 rounded-lg border-2 hover:bg-purple-100/50 hover:shadow-md',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-medium',
                    'block truncate',
                  ]"
                  >{{ emoji }}</span
                >
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 0.2rem;
}
</style>
