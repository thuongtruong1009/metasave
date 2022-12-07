<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  tags: string[];
}>();

const newTag = ref<string>("");

const emit = defineEmits<{
  (event: "input", tag: Array<string>): void;
}>();

const addTag = () => {
  if (
    newTag.value.trim().length === 0 ||
    props.tags.includes(newTag.value.trim())
  ) {
    return;
  }
  emit("input", [...props.tags, newTag.value.trim()]);
  newTag.value = "";
};

const removeTag = (tag: string) => {
  emit(
    "input",
    props.tags.filter((t) => t !== tag)
  );
};
</script>

<template>
  <div
    class="flex flex-wrap border rounded-lg w-full my-3 max-h-24 overflow-y-scroll"
  >
    <span
      v-for="(tag, i) in tags"
      :key="i"
      class="inline-flex items-center text-sm bg-[#bcdefa] text-[#1c3d5a] rounded-md m-1 pl-1.5 py-1.5 pr-3 relative"
    >
      <span>{{ tag }}</span>
      <button
        type="button"
        class="text-[##2779bd] text-lg absolute -top-2 right-0"
        @click="removeTag(tag)"
      >
        &times;
      </button>
    </span>
    <input
      class="tags-input-text flex-1"
      :placeholder="`Add attendees...`"
      @keydown.space.prevent="addTag"
      v-model="newTag"
    />
  </div>
</template>
