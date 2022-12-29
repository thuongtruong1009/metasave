<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { Menu, MenuButton, MenuItem } from "@headlessui/vue";
import { Icon } from "@iconify/vue";
import { getCurrentDate, getDateFormat, getISOFormat } from "@/helpers/date";
import EventService from "@/services/event.service";
import AvatarTag from "@/components/calendar/AvatarTag.vue";
import HourSelect from "./HourSelect.vue";
import TagInput from "../TagInput.vue";
import ColorSet from "../ColorSet.vue";

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
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}>();

const payload = reactive<any>({
  time: {
    start: "",
    end: "",
    date: "",
  },
  _id: "",
  organizer: {
    _id: "",
    username: "",
    avatar: "",
  },
  title: "",
  description: "",
  location: "",
  attendees: [],
  colorId: {
    _id: "",
    name: "",
  },
  createdAt: "",
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
const openTooltip = () => {
  isOpen.value = !isOpen.value;
  getEventById(props.data._id);
};

const isEdit = ref<boolean>(false);
const openEdit = () => {
  isEdit.value = true;
};
const closeEdit = () => {
  isEdit.value = false;
};

const deleteAttendent = async (attendentId: string) => {
  payload.attendees = payload.attendees.filter(
    (attendent: any) => attendent._id !== attendentId
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

const emits = defineEmits<{
  (event: "delete-event"): void;
  (event: "update-event"): void;
}>();

const updateAttendees = (attendees: any) => {
  payload.attendees = attendees;
};

const dateInputUpdate = ref(
  getDateFormat(
    getCurrentDate(props.data.time.date).year,
    getCurrentDate(props.data.time.date).month,
    getCurrentDate(props.data.time.date).day
  )
);
const getHourStart = (hour: string) => {
  payload.time.start = getISOFormat(dateInputUpdate.value, hour);
};
const getHourEnd = (hour: string) => {
  payload.time.end = getISOFormat(dateInputUpdate.value, hour);
};

const setColor = (color: string) => {
  payload.colorId.name = color;
};

const updateEvent = async () => {
  await EventService.updateEvent(payload._id, payload);
  emits("update-event");
  isOpen.value = false;
  isEdit.value = false;
};

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
  >
    <div
      class="flex flex-col justify-center items-center h-full cursor-pointer"
      @click="openTooltip"
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
        class="absolute w-max bg-white mx-2 p-1 origin-top-right divide-y divide-gray-100 rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        :style="`top: ${props.position.top}; right: ${props.position.right}; bottom: ${props.position.bottom}; left: ${props.position.left};`"
        :class="isOpen ? 'block' : 'hidden'"
      >
        <div class="tooltip_field grid grid-cols-1" v-if="!isEdit">
          <div>
            <span>Name:</span>
            <h1 class="text-sm font-semibold text-center">
              {{ payload.title }}
            </h1>
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
            <p>-</p>
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
            <div class="flex -space-x-2" v-if="payload.attendees.length > 5">
              <img
                class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                :src="`${
                  payload.attendees[i]
                    ? payload.attendees[i].avatar
                    : 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                }`"
                alt="attendent_avatar_img"
                v-for="(avatar, i) in 5"
                :key="i"
              />
              <a
                class="flex justify-center items-center w-6 h-6 text-xs font-medium text-white bg-gray-700 rounded-full border-2 border-white hover:bg-gray-600 dark:border-gray-800"
                href=""
                >{{ payload.attendees.length - 5 }}</a
              >
            </div>
            <div class="flex -space-x-2" v-else>
              <img
                class="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800"
                :src="`${
                  payload.attendees[i]
                    ? payload.attendees[i].avatar
                    : 'https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg'
                }`"
                alt="attendent_avatar_img"
                v-for="(avatar, i) in payload.attendees.length"
                :key="i"
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
        <div class="flex text-sm text-gray-500 pt-1" v-if="!isEdit">
          <button
            type="button"
            @click="deleteEvent"
            class="hover:bg-violet-500 hover:text-white group flex justify-center w-full items-start rounded-md p-2 hover:shadow-md"
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
            class="hover:bg-violet-500 hover:text-white group flex justify-center w-full items-start rounded-md p-2 hover:shadow-md"
          >
            <Icon
              icon="material-symbols:edit-outline"
              aria-hidden="true"
              width="18"
            />
            Edit
          </button>
        </div>

        <div class="tooltip_field grid grid-cols-1 w-80" v-if="isEdit">
          <div>
            <span>Name:</span>
            <input type="text" v-model="payload.title" />
          </div>
          <div>
            <span>Description:</span>
            <input type="text" v-model="payload.description" />
          </div>
          <div>
            <span>Color:</span>
            <ColorSet
              :currentColor="payload.colorId._id"
              @choose="setColor($event)"
            />
          </div>
          <div>
            <span>Location:</span>
            <input type="text" v-model="payload.location" />
          </div>
          <div>
            <span>Time:</span>
            <input type="date" v-model="dateInputUpdate" />
          </div>
          <div>
            <span>Period:</span>
            <HourSelect @select="getHourStart($event)" />
            <p>to</p>
            <HourSelect @select="getHourEnd($event)" />
          </div>
          <div>
            <span>Attendees:</span>
            <TagInput
              :tags="payload.attendees"
              @update-tag="updateAttendees($event)"
            />
          </div>
        </div>
        <div class="flex text-sm text-gray-500 pt-1" v-if="isEdit">
          <button
            type="button"
            @click="closeEdit"
            class="hover:bg-violet-500 hover:text-white group flex justify-center w-full items-start rounded-md p-2 hover:shadow-md"
          >
            <Icon
              icon="material-symbols:cancel-outline-rounded"
              aria-hidden="true"
              width="18"
            />
            Cancel
          </button>
          <button
            @click="updateEvent"
            :class="[isValidatePayload ? '' : 'opacity-50 cursor-not-allowed']"
            :disabled="!isValidatePayload"
            class="hover:bg-violet-500 hover:text-white group flex justify-center w-full items-start rounded-md p-2 hover:shadow-md"
          >
            <Icon icon="ic:outline-save" aria-hidden="true" width="18" />
            Save
          </button>
        </div>
      </div>
    </transition>
  </Menu>
</template>

<style lang="scss" scoped>
.tooltip_field > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  width: 100%;

  span {
    font-weight: 400;
    font-size: 0.8em;
    width: 4rem;
  }

  p {
    font-weight: 600;
  }
  input {
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    height: 2rem;
    width: 100%;
  }
}
</style>
