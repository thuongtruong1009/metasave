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
import { personalHours } from "@/shared/time";

const selectedHour = ref<string>(personalHours[0]);

const emit = defineEmits<{
  (event: "select", hour: string): void;
}>();

watchEffect(() => {
  emit("select", selectedHour.value);
});
</script>
<template>
  <div class="w-min">
    <Listbox v-model="selectedHour">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-pointer hover:bg-purple-100 rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ selectedHour }}</span>
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
            class="absolute mt-2 max-h-40 w-max right-0 z-10 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="(hour, i) in personalHours"
              :key="i"
              :value="hour"
              as="template"
            >
              <li
                :class="[
                  selected ? 'bg-purple-100 text-purple-900' : 'text-gray-900',
                  'relative cursor-pointer py-2 pl-10 pr-4',
                ]"
              >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-2 text-purple-600"
                >
                  <Icon
                    icon="material-symbols:check-small-rounded"
                    width="22"
                  />
                </span>
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-medium',
                    'block truncate',
                  ]"
                  >{{ hour }}</span
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
