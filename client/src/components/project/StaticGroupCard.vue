<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import Tag from "@/components/project/board/Tag.vue";
import useTagStore from "@/store/tag";
import {
  IGroupCardByTotal,
  IGroupCardByTag,
  IGroupCardByStatus,
} from "@/types";
import { kanbanTypes } from "@/shared/kanban";

const store = useTagStore();

const props = defineProps<{
  data: {
    total: IGroupCardByTotal;
    groupCardByTag: Array<IGroupCardByTag>;
    groupCardByStatus: Array<IGroupCardByStatus>;
  };
}>();

const infos = reactive<any>([
  {
    id: 0,
    name: "Overview",
  },
  {
    id: 1,
    name: "Tag group",
    groups: props.data.groupCardByTag,
  },
  {
    id: 2,
    name: "Status group",
    groups: props.data.groupCardByStatus,
  },
]);

watchEffect(() => {
  infos[1].groups = props.data.groupCardByTag;
  infos[2].groups = props.data.groupCardByStatus;
});

const getTagNoName = (tagId: string) => {
  return tagId ? store.getTagName(tagId) : "No name";
};
</script>

<template>
  <div class="w-full my-2">
    <TabGroup>
      <TabList
        class="flex justify-center space-x-1 rounded-xl bg-purple-100 p-1"
      >
        <Tab
          v-for="info in infos"
          as="template"
          :key="info.id"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full rounded-lg py-2 text-sm leading-5',
              selected
                ? 'bg-white shadow-md text-purple-700 font-semibold'
                : 'text-gray-500 hover:bg-white/[0.12] font-normal',
            ]"
          >
            {{ info.name }}
          </button>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel v-for="info in infos" :key="info.id">
          <ul v-if="info.id === 0" class="grid grid-cols-3">
            <li
              v-for="i in 3"
              :key="i"
              class="rounded-md p-3 mt-1 hover:bg-gray-100"
            >
              <div class="flex justify-center items-center">
                <div
                  class="text-sm font-medium leading-5 rounded-full shadow-md p-0.5 w-7 h-7 flex justify-center items-center ml-1 bg-purple-100"
                >
                  <p v-if="i === 1">{{ props.data.total.totalCard }}</p>
                  <p v-if="i === 2">{{ props.data.total.totalTag }}</p>
                  <p v-if="i === 3">{{ props.data.total.totalStatus }}</p>
                </div>
              </div>
            </li>
          </ul>
          <ul v-if="info.id === 1" class="grid grid-cols-3">
            <li
              v-for="(group, i) in info.groups"
              :key="i"
              class="rounded-md p-3 mt-1 hover:bg-gray-100"
            >
              <div class="flex justify-center items-center">
                <Tag :tagId="group?._id?._id" />
                <h3
                  class="text-sm font-medium leading-5 rounded-full shadow-md p-0.5 w-7 h-7 flex justify-center items-center ml-1"
                  :class="`bg-[${store.getTagColor(group?._id?._id)}]`"
                >
                  {{ group.total }}
                </h3>
              </div>
            </li>
          </ul>

          <ul v-if="info.id === 2" class="grid grid-cols-3">
            <li
              v-for="(group, i) in info.groups"
              :key="i"
              class="rounded-md p-3 mt-1 hover:bg-gray-100"
            >
              <div class="flex justify-center items-center">
                <div
                  class="text-sm font-medium leading-5 rounded-md shadow-md py-0.5 px-2 flex items-center gap-0.5"
                  :class="kanbanTypes[group._id - 1].palette"
                >
                  <Icon :icon="kanbanTypes[group._id].icon" width="12" />
                  <p>
                    {{ kanbanTypes[group._id].name }}
                  </p>
                </div>
                <h3
                  class="text-sm font-medium leading-5 rounded-full shadow-md p-0.5 w-7 h-7 flex justify-center items-center ml-1"
                  :class="kanbanTypes[group._id - 1].palette"
                >
                  {{ group.total }}
                </h3>
              </div>
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
