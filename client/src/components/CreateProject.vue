<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import Modal from "./Modal.vue";

const isOpen = ref<boolean>(false);

function closeModal(): void {
  isOpen.value = false;
}
function openModal(): void {
  isOpen.value = true;
}
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #openBtn>
      <button
        type="button"
        @click="openModal"
        class="flex items-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <Icon icon="material-symbols:add" width="20" class="w-8" /><span
          >New</span
        >
      </button>
    </template>
    <template #title>
      <h1>Create new project</h1>
    </template>
    <template #content>
      <p>This is new description</p>
    </template>
    <template #closeBtn>
      <div class="mt-4">
        <button
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          @click="closeModal"
        >
          Close!
        </button>
      </div>
    </template>
  </Modal>
</template>
