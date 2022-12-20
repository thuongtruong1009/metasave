<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { Icon } from "@iconify/vue";

const items = [
  {
    name: "Delete all cards",
    icon: "uil:trash-alt",
  },
  {
    name: "Screenshot",
    icon: "material-symbols:control-camera",
  },
];
</script>

<template>
  <div class="w-max z-10">
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton
        class="w-8 flex justify-center items-center rounded-full hover:bg-white/30 dark:bg-gray-600 dark:text-gray-300 py-1.5 text-sm font-bold"
      >
        <Icon icon="uil:setting" width="20" />
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-75 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-110 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-75 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem
              v-slot="{ active }"
              v-for="item in items"
              :key="item.name"
            >
              <button
                :class="[
                  active
                    ? 'bg-violet-500 text-white shadow-md'
                    : 'text-gray-900',
                  'group flex w-full items-start rounded-md px-2 py-2 text-sm',
                ]"
              >
                <Icon
                  :icon="item.icon"
                  :class="[active ? '' : 'text-violet-400', 'mr-2 h-5 w-5']"
                  aria-hidden="true"
                />
                <EditIcon
                  :active="active"
                  class="text-violet-400"
                  aria-hidden="true"
                />
                {{ item.name }}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
