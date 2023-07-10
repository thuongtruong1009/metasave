<script setup lang="ts">
import { ref, reactive, onMounted, computed, watchEffect } from "vue";
import AdminColorsService from "@/services/admin/colors";

type Color = {
  _id: string;
  name: string;
  __v: number;
};

type IPayload = {
  total: number;
  colors: Color[];
  searchInput: string;
  isUpdate: boolean;
};

const payload = reactive<IPayload>({
  total: 0,
  colors: [],
  searchInput: "",
  isUpdate: false,
});

const searchResult = computed(() => {
  const tmp = payload.colors.slice(0);
  return tmp.filter((color: Color) =>
    color.name.toLowerCase().includes(payload.searchInput.toLowerCase())
  );
});

onMounted(async () => {
  const { data } = await AdminColorsService.getColors();
  payload.colors = data.colors;
  payload.total = data.total;
});

const handleUpdate = async (id: string, name: string) => {
  await AdminColorsService.updateColorById(id, { name: name });
  payload.colors.forEach((item, index) => {
    if (item.name === name) {
      payload.colors.splice(index, 1, item);
    }
  });
};
</script>

<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <div class="pb-4 bg-transparent">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          v-model="payload.searchInput"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for items"
        />
      </div>
    </div>
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-white/10 rounded-t-lg dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="p-4" />

          <th scope="col" class="px-6 py-3">Product name</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-transparent border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="color in searchResult"
          :key="color._id"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label for="checkbox-table-search-1" class="sr-only"
                >checkbox</label
              >
            </div>
          </td>
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ color.name }}
          </th>
          <td class="px-6 py-4">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
