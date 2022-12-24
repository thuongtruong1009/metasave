<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import useTagStore from "@/store/tag";
const store = useTagStore();

const props = defineProps<{
  tagId: string;
}>();

const matchedTag = computed(() => store.getTagName(props.tagId));
const getTagColorById = computed(() => store.getTagColor(props.tagId));
</script>

<template>
  <span
    class="text-xs font-medium px-2.5 py-0.5 w-max rounded-md text-blue-700 shadow-md h-min"
    :class="[
      matchedTag ? 'opacity-100' : 'opacity-0',
      `bg-[${getTagColorById}]`,
    ]"
    ><Icon icon="mdi:tag-multiple" class="inline-flex mr-1" width="16" />{{
      matchedTag
    }}</span
  >
</template>
