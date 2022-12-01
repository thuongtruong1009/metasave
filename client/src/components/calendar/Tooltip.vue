<script setup lang="ts">
import { ref } from "vue";
import { Menu, MenuButton, MenuItem } from "@headlessui/vue";

defineProps<{
  props: {
    color: string;
    title: string;
    start: string;
    end: string;
  };
}>();

const isOpen = ref<boolean>(false);
const openTooltip = (status: boolean) => {
  isOpen.value = status;
};
</script>

<template>
  <Menu
    as="div"
    class="relative inline-block text-left w-full w-full h-full rounded-lg break-words whitespace-pre-wrap p-1.5 text-sm cursor-pointer hover:shadow-lg dark:bg-gray-600"
    :class="`bg-${props.color}`"
    @mouseover="openTooltip(true)"
    @mouseout="openTooltip(false)"
  >
    <div>
      <h1 class="font-semibold">
        {{ props.title }}
      </h1>
      <p class="text-xs">
        {{ props.start }}:
        {{ props.end }}
      </p>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        class="absolute right-full top-0 w-56 mr-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        :class="isOpen ? 'block' : 'hidden'"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <EditIcon
                :active="active"
                class="mr-2 h-5 w-5 text-violet-400"
                aria-hidden="true"
              />
              Edit
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <DuplicateIcon
                :active="active"
                class="mr-2 h-5 w-5 text-violet-400"
                aria-hidden="true"
              />
              Duplicate
            </button>
          </MenuItem>
        </div>
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <ArchiveIcon
                :active="active"
                class="mr-2 h-5 w-5 text-violet-400"
                aria-hidden="true"
              />
              Archive
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <MoveIcon
                :active="active"
                class="mr-2 h-5 w-5 text-violet-400"
                aria-hidden="true"
              />
              Move
            </button>
          </MenuItem>
        </div>

        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <button
              :class="[
                active ? 'bg-violet-500 text-white' : 'text-gray-900',
                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
              ]"
            >
              <DeleteIcon
                :active="active"
                class="mr-2 h-5 w-5 text-violet-400"
                aria-hidden="true"
              />
              Delete
            </button>
          </MenuItem>
        </div>
      </div>
    </transition>
  </Menu>
</template>
