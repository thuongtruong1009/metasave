<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { RectangleGroupIcon } from "@heroicons/vue/20/solid";
</script>

<template>
  <Menu as="div" class="relative inline-block text-left min-w-max h-min z-10">
    <MenuButton
      class="inline-flex w-full rounded-md bg-white bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <RectangleGroupIcon class="h-5 w-5" aria-hidden="true" />
      <p class="mx-2">Project Space</p>
      <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
    </MenuButton>

    <transition
      enter-active-class="transition duration-110 ease-out"
      enter-from-class="transform scale-50 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-80 opacity-0"
    >
      <MenuItems
        class="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }" v-for="i in 3" :key="i">
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
              Note {{ i }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
