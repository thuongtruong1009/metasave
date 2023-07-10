<script setup lang="ts">
const props = defineProps<{
  value: string;
  type?: string;
  required?: boolean;
  class?: string;
}>();

const emits = defineEmits(["update:value"]);

const updateValue = (value: string) => {
  emits("update:value", value);
};
</script>

<template>
  <input
    :type="props.type || 'text'"
    :value="props.value"
    @input="updateValue($event.target.value)"
    :required="props.required || false"
    :autocomplete="props.value ? 'on' : 'off'"
    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
  />
</template>
