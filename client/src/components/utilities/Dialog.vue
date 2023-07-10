<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  title: string;
  hasIcon?: boolean;
}>();
</script>

<template>
  <div class="relative z-10">
    <slot name="openButton" />
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="ease-out duration-300"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-to-class="opacity-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        v-if="isOpen"
      />
    </Transition>
    <Transition
      enter-from-class="opacity-0 sm:-translate-y-4 sm:scale-95"
      enter-active-class="ease-out duration-300"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-to-class="opacity-0 -translate-y-4 sm:scale-95"
    >
      <div class="fixed inset-0 z-10 overflow-y-auto" v-if="isOpen">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                >
                  <slot name="icon" />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900 mb-2"
                    id="modal-title"
                  >
                    {{ title }}
                  </h3>
                  <slot name="content" />
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
            >
              <slot name="doneButton" />
              <slot name="closeButton" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
