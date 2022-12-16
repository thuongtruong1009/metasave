<script setup lang="ts">
import { ref } from "vue";
import AvatarTag from "./calendar/AvatarTag.vue";
import SearchUser from "./calendar/SearchUser.vue";
import { IUserTag } from "@/types";

const props = defineProps<{
  tags: Array<IUserTag>;
}>();

const emit = defineEmits<{
  (event: "update-tag", tag: Array<IUserTag>): void;
}>();

const addTag = (tag: IUserTag) => {
  if (props.tags.includes(tag)) {
    return;
  }
  emit("update-tag", [...props.tags, tag]);
};

const removeTag = (tagId: string) => {
  emit(
    "update-tag",
    props.tags.filter((tag: IUserTag) => tag._id !== tagId)
  );
};
</script>

<template>
  <div
    class="flex flex-wrap border rounded-lg w-full max-h-24 overflow-y-scroll"
  >
    <div v-for="tag in props.tags" :key="tag._id">
      <AvatarTag
        :user="{
          _id: tag._id,
          username: tag.username,
          avatar: tag.avatar,
        }"
        @delete-user="removeTag(tag._id)"
      />
    </div>
    <SearchUser @add-user="addTag($event)" />
  </div>
</template>
