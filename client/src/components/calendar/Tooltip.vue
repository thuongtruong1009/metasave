<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Menu, MenuButton, MenuItem } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import { getCurrentDate, getDateFormat } from "@/helpers/date";
import EventService from "@/services/event.service";
import AvatarTag from "@/components/calendar/AvatarTag.vue";

const props = defineProps<{
  data: {
    _id: string;
    time: {
      start: string;
      end: string;
      date: string;
    };
    title: string;
    colorId: {
      _id: string;
      name: string;
    };
    updatedAt: string;
  };
}>();

const payload = reactive({
  time: {
    start: "2023-01-15T01:00:00.000Z",
    end: "2023-01-15T09:00:00.000Z",
    date: "2023-01-15T00:00:00.000Z",
  },
  _id: "6399340800daa0b3ec71a51b",
  organizer: {
    _id: "638e20cf7cc65d797b25f52b",
    username: "user01",
    avatar:
      "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
  },
  title: "Đi bơi",
  description: "Thịnh bao",
  location: "Công viên nước Suối Tiên",
  attendees: [],
  colorId: {
    _id: "638e1c2be9056c12612c6192",
    name: "#FFCAD4",
  },
  createdAt: "2022-12-14T02:25:12.688Z",
});
const getEventById = async (eventId: string) => {
  const { data } = await EventService.getEventById(eventId);
  payload.time = data.time;
  payload._id = data._id;
  payload.organizer = data.organizer;
  payload.title = data.title;
  payload.description = data.description;
  payload.location = data.location;
  payload.attendees = data.attendees;
  payload.colorId = data.colorId;
  payload.createdAt = data.createdAt;
  return data;
};

const isOpen = ref<boolean>(false);
const openTooltip = (status: boolean) => {
  isOpen.value = status;
  //getEventById(props.data._id);
};

const isEdit = ref<boolean>(false);
const openEdit = () => {
  isEdit.value = true;
};
const closeEdit = () => {
  isEdit.value = false;
  isOpen.value = false;
};

const deleteAttendent = async (attendentId: string) => {
  payload.attendees = payload.attendees.filter(
    (attendent) => attendent._id !== attendentId
  );
};

const isValidatePayload = computed(() => {
  if (
    payload.title === "" ||
    payload.time.start === "" ||
    payload.time.end === "" ||
    payload.time.date === ""
  ) {
    return false;
  }
  return true;
});

const updateEvent = async () => {
  await EventService.updateEvent(payload._id, payload);
  isOpen.value = false;
};

const emits = defineEmits<{
  (event: "delete-event"): void;
}>();

const deleteEvent = async () => {
  await EventService.deleteEvent(payload._id);
  isOpen.value = false;
  emits("delete-event");
};
</script>

<template>
  <Menu
    as="div"
    class="relative inline-block text-left w-full w-full h-full rounded-lg break-words whitespace-pre-wrap p-1.5 text-sm hover:shadow-lg dark:bg-gray-600"
    :class="`bg-[${props.data.colorId.name}]`"
    @mouseover="openTooltip(true)"
    @mouseout="openTooltip(false)"
    @mouseenter="getEventById(props.data._id)"
  >
    <div
      class="flex flex-col justify-center items-center h-full cursor-pointer"
    >
      <h1 class="font-semibold overflow-ellipsis whitespace-nowrap">
        {{ props.data.title }}
      </h1>
      <p class="text-xs">
        {{ getCurrentDate(props.data.time.start).hour }}:
        {{ getCurrentDate(props.data.time.end).hour }}
      </p>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        class="absolute right-full top-0 w-max bg-white mr-2 p-1 origin-top-right divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        :class="isOpen ? 'block' : 'hidden'"
      >
        <div class="tooltip_field grid grid-cols-1">
          <div>
            <span>Name:</span>
            <h1 v-if="!isEdit" class="text-sm font-semibold text-center">
              {{ payload.title }}
            </h1>
            <input type="text" v-else v-model="payload.title" />
          </div>
          <div>
            <span>Description:</span>
            <p>{{ payload.description }}</p>
          </div>
          <div>
            <span>Location:</span>
            <p>{{ payload.location }}</p>
          </div>
          <div>
            <span>Time:</span>
            <p>
              {{ getCurrentDate(payload.time.date).year }}/{{
                getCurrentDate(payload.time.date).month
              }}/{{ getCurrentDate(payload.time.date).day }}
            </p>
            <p>{{ getCurrentDate(payload.time.start).hour }}</p>
            <span>-</span>
            <p>
              {{ getCurrentDate(payload.time.end).hour }}
            </p>
          </div>
          <div>
            <span>Organizer:</span>
            <p>{{ payload.organizer.username }}</p>
          </div>
          <div v-if="payload.attendees.length > 0">
            <span>Attendees:</span>
            <div v-for="attendent in payload.attendees" :key="attendent._id">
              <AvatarTag
                :attendent="{
                  _id: attendent._id,
                  username: attendent.username,
                  avatar: attendent.avatar,
                }"
                @delete-attendent="deleteAttendent(attendent._id)"
              />
            </div>
          </div>
          <div>
            <span>Created at:</span>
            <p>
              {{
                getDateFormat(
                  getCurrentDate(payload.createdAt).year,
                  getCurrentDate(payload.createdAt).month,
                  getCurrentDate(payload.createdAt).day
                )
              }}
            </p>
            <p>{{ getCurrentDate(payload.createdAt).hour }}</p>
          </div>
        </div>

        <div class="flex text-sm text-gray-500 pt-1" v-if="isEdit">
          <button
            type="button"
            @click="closeEdit"
            class="hover:bg-violet-500 hover:text-white group flex justify-center w-full items-start rounded-md p-2"
          >
            <Icon
              icon="material-symbols:cancel-outline-rounded"
              aria-hidden="true"
              width="18"
            />
            Cancel
          </button>
          <button
            @click="closeEdit"
            :class="[isValidatePayload ? '' : 'opacity-50 cursor-not-allowed']"
            :disabled="!isValidatePayload"
            class="hover:bg-violet-500 hover:text-white group flex justify-center w-full items-start rounded-md p-2"
          >
            <Icon icon="ic:outline-save" aria-hidden="true" width="18" />
            Save
          </button>
        </div>
        <div class="flex text-sm text-gray-500 pt-1" v-else>
          <button
            type="button"
            @click="deleteEvent"
            class="hover:bg-violet-500 hover:text-white group flex justify-center w-full items-start rounded-md p-2"
          >
            <Icon
              icon="material-symbols:delete-outline-rounded"
              aria-hidden="true"
              width="18"
            />
            Delete
          </button>
          <button
            @click="openEdit"
            class="hover:bg-violet-500 hover:text-white group flex justify-center w-full items-start rounded-md p-2"
          >
            <Icon
              icon="material-symbols:edit-outline"
              aria-hidden="true"
              width="18"
            />
            Edit
          </button>
        </div>
      </div>
    </transition>
  </Menu>
</template>

<style lang="scss" scoped>
.tooltip_field > div {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;

  span {
    font-weight: 400;
    font-size: 0.8em;
  }

  p {
    font-weight: 600;
  }
}
</style>
