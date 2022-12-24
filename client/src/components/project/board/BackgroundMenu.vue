<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import ColorSet from "@/components/ColorSet.vue";
import BoardService from "@/services/board.service";
import { customBackgrounds } from "@/shared/background";

const router = useRouter();

const boardId = router.currentRoute.value.params.boardId as string;

const payload = reactive({
  background: "",
  customBackground: "",
});

onMounted(async () => {
  const { data } = await BoardService.getBoardById(boardId);
  payload.background = data.board.background._id;
  payload.customBackground = data.customBackground;
});

const updateBackground = (backgroundId: string) => {
  payload.background = backgroundId;
};

const updateCustomBackground = (backgroundUrl: string) => {
  payload.customBackground = backgroundUrl;
};

const isValidate = computed(
  () => payload.background.length > 0 || payload.customBackground.length > 0
);

async function handleUpdate(close: any): Promise<void> {
  await BoardService.updateBoard(boardId, payload);
  close();
  return;
}
</script>

<template>
  <div class="w-max z-20">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="inline-flex w-full justify-center items-center gap-1 rounded-md bg-white hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-300 shadow-md px-3 py-2 text-sm font-medium"
      >
        <p>Background</p>
        <Icon icon="mdi:chevron-down" width="20" />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-75 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-110 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-75 opacity-0"
      >
        <PopoverPanel
          v-slot="{ close }"
          class="absolute right-0 mt-2 max-w-96 w-72 origin-top-right divide-y divide-gray-100 rounded-lg bg-white dark:bg-gray-600 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="divide-y divide-dotted p-2">
            <div class="text-xs text-gray-400 dark:tex-gray-600 p-2">
              <div>
                <span class="mb-2 block">Choose static background:</span>
                <ColorSet
                  :currentColor="payload.background"
                  @choose="updateBackground($event)"
                />
                <span class="my-2 block">Choose custom background:</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(background, i) in customBackgrounds"
                  :key="i"
                  class="w-20 h-20 rounded-xl cursor-pointer hover:shadow-xl"
                  :class="
                    background === payload.customBackground
                      ? 'ring-1 ring-purple-500 ring-offset-1 shadow-xl'
                      : 'shadow-md'
                  "
                  :style="`background-image: url(${background}); background-size: cover; background-position: center;`"
                  @click="updateCustomBackground(background)"
                ></div>
              </div>
            </div>

            <div class="flex justify-evenly pt-2">
              <button type="button" class="opacity-70 text-sm" @click="close">
                Cancel
              </button>
              <button
                :class="[
                  isValidate
                    ? 'bg-violet-500 text-white'
                    : 'cursor-not-allowed text-gray-400 bg-violet-200',
                  'hover:bg-violet-600 shadow-lg hover:shadow-xl flex w-max items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                <Icon
                  icon="ic:baseline-update"
                  width="18"
                  class="mr-1"
                  aria-hidden="true"
                />
                <span @click="handleUpdate(close)">Update</span>
              </button>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>
