<script setup lang="ts">
const props = defineProps<{
  value: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  class?: string;
  disabled?: boolean;
}>();

const emits = defineEmits(["update:value"]);

const updateValue = (value: string) => {
  emits("update:value", value);
};
</script>

<template>
  <div
    class="flex items-center rounded-md shadow-sm dark:ring-transparent ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-white/10 text-gray-900 dark:text-gray-200"
    :class="`${props.class} ${
      props.disabled ? 'cursor-none pointer-events-none' : ''
    }`"
  >
    <slot name="leftIcon" />
    <input
      :type="props.type || 'text'"
      :value="props.value"
      @input="(e: any) => updateValue(e.target?.value)"
      :required="props.required || false"
      :autocomplete="props.value ? 'on' : 'off'"
      :disabled="props.disabled || false"
      :placeholder="props.placeholder || ''"
      autofocus
      class="w-full border-0 bg-transparent placeholder:text-gray-400 focus:ring-0"
    />
    <slot name="rightIcon" />
  </div>
</template>
