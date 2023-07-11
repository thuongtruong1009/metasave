<script setup lang="ts">
import { reactive, onMounted, computed } from "vue";
import { Icon } from "@iconify/vue";
import AdminColorsService from "@/services/admin/colors";
import Input from "@/components/utilities/Input.vue";
import Button from "@/components/utilities/Button.vue";

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
  itemUpdate: Color;
  isDelete: boolean;
  itemDelete: Color;
  isCreate: boolean;
  createInput: string;
};

const payload = reactive<IPayload>({
  total: 0,
  colors: [],
  searchInput: "",
  isUpdate: false,
  itemUpdate: {} as Color,
  isDelete: false,
  itemDelete: {} as Color,
  isCreate: false,
  createInput: "",
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

const changeCreateStatus = (): void => {
  payload.isCreate = !payload.isCreate;
};

const handleCreate = async () => {
  await AdminColorsService.createColor({ name: payload.createInput });
  payload.colors.unshift({ _id: "123", name: payload.createInput, __v: 0 });
  changeCreateStatus();
  payload.createInput = "";
};

const handleUpdate = async (id: string, name: string) => {
  if (name === "") return;
  await AdminColorsService.updateColorById(id, { name: name });
  payload.colors.forEach((item, index) => {
    if (item.name === name) {
      payload.colors.splice(index, 1, item);
    }
  });
  changeUpdateStatus();
};

const changeUpdateStatus = (item?: Color): void => {
  payload.isUpdate = !payload.isUpdate;
  if (item) {
    payload.itemUpdate = item;
  }
};

const changeDeleteStatus = (item?: Color): void => {
  payload.isDelete = !payload.isDelete;
  if (item) {
    payload.itemDelete = item;
  }
};

const handleDelete = async (id: string) => {
  await AdminColorsService.deleteColorById(id);
  payload.colors.forEach((item, index) => {
    if (item._id === id) {
      payload.colors.splice(index, 1);
    }
  });
  changeDeleteStatus();
};
</script>

<template>
  <section>
    <div class="flex items-start">
      <Input
        :value="payload.searchInput"
        @update:value="payload.searchInput = $event"
        placeholder="Search for items"
        class="w-full mb-2"
      >
        <template #leftIcon>
          <Icon
            icon="ic:round-search"
            class="w-6 h-6 text-gray-500 dark:text-gray-400 ml-2"
          />
        </template>
      </Input>
      <div
        class="p-2 rounded h-full bg-purple-100 hover:bg-purple-200 dark:bg-purple-700 ml-2 cursor-pointer"
        @click="changeCreateStatus"
      >
        <Icon
          :icon="`${
            payload.isCreate ? 'clarity:cancel-line' : 'gridicons:create'
          }`"
          class="w-6 h-6 text-gray-500 dark:text-gray-200"
        />
      </div>
    </div>
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md rounded-xl"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-white/10 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="p-4">{{ payload.total }}</th>

          <th scope="col" class="px-6 py-3">Color name</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="payload.isCreate"
          class="bg-transparent border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5"
        >
          <td class="w-4 p-4" />
          <td
            class="px-6 py-4 flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <Input
              :value="payload.createInput"
              @update:value="payload.createInput = $event"
              placeholder="Enter color name"
              class="w-60 mb-2 h-9 mt-2"
            />
          </td>
          <td class="place-content-center">
            <Button @onSubmit="handleCreate" text="Create" variant="info" />
          </td>
        </tr>

        <tr
          class="bg-transparent border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 last:rounded-b-xl"
          v-for="color in searchResult"
          :key="color._id"
        >
          <td class="w-4 p-4">
            <div class="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                @click="changeDeleteStatus(color)"
                class="w-4 h-4 cursor-pointer text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
            <Input
              :value="payload.itemUpdate.name"
              @update:value="payload.itemUpdate.name = $event"
              v-if="payload.isUpdate && payload.itemUpdate._id === color._id"
            />
            <Input
              :value="color.name"
              :disabled="true"
              v-else
              :class="`bg-[${color.name}]`"
            />
          </th>

          <td class="px-6 py-4">
            <span
              @click="
                payload.isDelete && payload.itemDelete._id === color._id
                  ? handleDelete(color._id)
                  : payload.isUpdate && payload.itemUpdate._id === color._id
                  ? handleUpdate(color._id, payload.itemUpdate.name)
                  : changeUpdateStatus(color)
              "
              class="font-medium text-purple-600 dark:text-purple-500 hover:underline cursor-pointer"
              >{{
                payload.isDelete && payload.itemDelete._id === color._id
                  ? "Delete"
                  : payload.isUpdate &&
                    payload.isUpdate &&
                    payload.itemUpdate._id === color._id
                  ? "Save"
                  : "Edit"
              }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
