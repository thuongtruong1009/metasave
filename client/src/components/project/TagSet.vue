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
import useTagStore from "@/store/tag";

const store = useTagStore();

type ITag = {
  _id: string;
  name: string;
  color: {
    _id: string;
    name: string;
  };
};
const tags = ref<Array<ITag>>([]);

const props = defineProps<{
  currentTagId?: string | undefined;
}>();

const currentTagId = ref<string | undefined>(props.currentTagId);

const emit = defineEmits<{
  (event: "update-tag", colorId: string): void;
}>();

watchEffect(async () => {
  tags.value = store.getAllTagsNoDefault;
  emit(
    "update-tag",
    currentTagId.value ? currentTagId.value : store.getDefaultTagId
  );
});
</script>

<template>
  <div class="w-min">
    <Listbox v-model="currentTagId">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-pointer hover:bg-purple-100 rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{
            currentTagId ? store.getTagName(currentTagId) : "Not choosed"
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
            class="absolute my-2 max-h-40 w-max bottom-full right-0 z-10 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="tag in tags"
              :key="tag._id"
              :value="tag._id"
              as="template"
            >
              <li
                :class="[
                  selected ? 'bg-purple-100 text-purple-900' : 'text-gray-900',
                  active ? 'bg-purple-100 text-purple-900' : 'text-gray-900',
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
                  >{{ store.getTagName(tag._id) }}</span
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
