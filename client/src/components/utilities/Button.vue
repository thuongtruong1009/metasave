<script setup lang="ts">
const props = defineProps<{
  text: string;
  class?: string;
  variant?: string;
  isOutline?: boolean;
  isDisabled?: boolean;
  isHoverEffect?: boolean;
}>();

const getClassOption = (color: string) => {
  return props.isOutline
    ? `border border-${color}-300`
    : props.isHoverEffect
    ? `hover:bg-${color}-500 hover:text-white`
    : `bg-${color}-500 text-white`;
};

const classOptions = () => {
  switch (props.variant) {
    case "primary":
      return getClassOption("blue");
    case "info":
      return getClassOption("purple");
    case "warning":
      return getClassOption("orange");
    case "error":
      return getClassOption("red");
    default:
      return "";
  }
};

const emits = defineEmits(["onSubmit"]);

const onSubmit = () => {
  emits("onSubmit");
};
</script>

<template>
  <button
    type="button"
    @click="onSubmit"
    :disabled="isDisabled ?? false"
    :class="`${
      props.class
    } ${classOptions()} flex items-center rounded-md px-2.5 py-1.5 font-medium`"
  >
    <slot name="leftIcon" />
    <span>{{ props.text }}</span>
    <slot name="rightIcon" />
  </button>
</template>
