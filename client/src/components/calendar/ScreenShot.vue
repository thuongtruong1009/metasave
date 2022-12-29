<script setup lang="ts">
import { ref, reactive, computed, watchEffect, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Switch } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import html2canvas from "html2canvas";
import EventService from "@/services/event.service";
import Modal from "@/components/Modal.vue";
import HourSelect from "./HourSelect.vue";
import ColorSet from "./ColorSet.vue";
import TagInput from "@/components/TagInput.vue";
import { getCurrentDate, getDateFormat } from "@/helpers/date";
import { saveFile } from "@/helpers/file";
import { copyToClipboard } from "@/helpers/copy";

const router = useRouter();

const isOpen = ref<boolean>(false);
function closeModal(): void {
  isOpen.value = false;
}
async function openModal(): Promise<void> {
  await onScreenShot();
  isOpen.value = true;
}

const props = defineProps<{
  data: any;
}>();

const output = ref<any>(null);
const onScreenShot = async () => {
  let el = props.data;
  output.value = (await html2canvas(el)).toDataURL();
};

const onSaveScreenshot = async () => {
  saveFile(output.value, "metasave_events.png");
  closeModal();
  output.value = "";
};

const isCopy = ref(false);
const onCopyScreenshot = () => {
  copyToClipboard(output.value);
  isCopy.value = true;
};
</script>

<template>
  <Modal :status="isOpen" @close="closeModal">
    <template #openBtn>
      <div
        @click="openModal"
        class="hover:shadow-lg rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <img
          class="w-8 my-1 mx-2"
          src="/img/photo.png"
          alt="screenshot_img"
          title="Screenshot events"
        />
      </div>
    </template>
    <template #title>
      <h1 class="text-2xl">Screenshot events</h1>
    </template>
    <template #closeBtn>
      <button
        type="button"
        @click="closeModal"
        class="hover:rotate-90 duration-200 ease-linear inline-flex"
      >
        <Icon icon="mdi:close" width="20" />
      </button>
    </template>
    <template #content>
      <div class="overflow-y-scroll max-h-96">
        <img :src="output" class="w-128 rounded-2xl" />
      </div>
    </template>
    <template #doneBtn>
      <div class="mt-5 flex justify-end items-center">
        <button
          type="button"
          class="h-min inline-flex justify-center items-start rounded-md border border-transparent px-4 py-2 ml-5 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 opacity-100 bg-blue-100 hover:bg-blue-200 cursor-pointer"
          @click="onCopyScreenshot"
        >
          <Icon
            icon="material-symbols:content-copy-outline"
            width="18"
            class="mr-1"
          /><span>{{ isCopy ? "Copied" : "Copy image link" }}</span>
        </button>

        <button
          type="button"
          class="h-min inline-flex justify-center items-start rounded-md border border-transparent px-4 py-2 ml-5 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 opacity-100 bg-blue-100 hover:bg-blue-200 cursor-pointer"
          @click="onSaveScreenshot"
        >
          <Icon icon="ic:baseline-save-alt" width="18" class="mr-1" /><span
            >Save</span
          >
        </button>
      </div>
    </template>
  </Modal>
</template>
