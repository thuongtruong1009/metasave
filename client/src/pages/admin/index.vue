<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/utilities/Button.vue";
import Dialog from "@/components/utilities/Dialog.vue";

const show = ref(false);

const changeToggle = () => {
  show.value = !show.value;
};
</script>

<template>
  <section>
    <Dialog :isOpen="show" @close="changeToggle" title="Deactivate account">
      <template #openButton>
        <Button
          @onSubmit="changeToggle"
          text="Toggle"
          variant="info"
          class="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 capitalize"
        />
      </template>

      <template #icon>
        <svg
          class="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </template>

      <template #content>
        <p class="text-sm text-gray-500">
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>
      </template>

      <template #closeButton>
        <Button
          @onSubmit="changeToggle"
          text="Close"
          class="w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        />
      </template>

      <template #doneButton>
        <Button
          @onSubmit="changeToggle"
          text="Done"
          class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
        />
      </template>
    </Dialog>
  </section>
</template>
