<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";
import { useElementSize } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import { personalHours, daysOfWeek } from "@/shared/time";
import {
  getCurrentDate,
  getDiffPeriod,
  getDateFormat,
  getListDaysOfWeek,
  getISOFormat,
  getWeekNo,
} from "@/helpers/date";
import { truncateString, sliceString } from "@/utils/format";
import TimeBar from "@/components/calendar/TimeBar.vue";
import DatePicker from "@/components/calendar/DatePicker.vue";
import Tooltip from "@/components/calendar/Tooltip.vue";
import { IEvent } from "@/types";
import CreateEvent from "@/components/calendar/CreateEvent.vue";
import EventService from "@/services/event.service";
import ScreenShot from "@/components/calendar/ScreenShot.vue";

const screenShot = ref<any>(null);
const headSize = ref(null);
const bodySize = ref(null);

const getCalendarSize = reactive({
  headWidth: useElementSize(headSize).width,
  headHeight: useElementSize(headSize).height,
  bodyWidth: useElementSize(bodySize).width,
  bodyHeight: useElementSize(bodySize).height,
});

const getHourIndex = (hour: string) =>
  personalHours.findIndex((h: string) => h === hour);

const getPositionTimebar = (parentHeight: number) => {
  const index = (
    ((parentHeight - 15) *
      (getHourIndex(getCurrentDate(new Date()).hour) +
        getCurrentDate(new Date()).minute / 60)) /
    personalHours.length
  ).toFixed(2);
  return index;
};
const payload = reactive({
  present: "organizer",
  start: getListDaysOfWeek(
    getWeekNo(new Date()),
    getCurrentDate(new Date()).year
  ).startDayInWeek,
  end: getListDaysOfWeek(getWeekNo(new Date()), getCurrentDate(new Date()).year)
    .endDayInWeek,
});

const events = ref<any>([]);

const handleGetAllEvents = async () => {
  const { data } = await EventService.getAllEvents(
    payload.present,
    payload.start,
    payload.end
  );
  events.value = data.events;
};

const getAllDaysWeek = computed(
  () => getListDaysOfWeek(getWeekNo(new Date(payload.start)), 2022).days
);
watchEffect(() => {
  handleGetAllEvents();
});

function onQueryDate(dataModel: any) {
  payload.start = dataModel.startDate;
  payload.end = dataModel.endDate;
}

const calculatePositionToolTip = (
  childIndexVertical: number,
  parentHeightVertical: number,
  childIndexHorinzontal: number,
  parentLengthHorinzontal: number
) => {
  if ((childIndexVertical / parentHeightVertical) * 100 < 50) {
    if ((childIndexHorinzontal / parentLengthHorinzontal) * 100 < 50) {
      return {
        top: "0",
        right: "100%",
      };
    } else {
      return {
        top: "0",
        left: "100%",
      };
    }
  } else {
    if ((childIndexHorinzontal / parentLengthHorinzontal) * 100 < 50) {
      return {
        bottom: "0",
        right: "100%",
      };
    } else {
      return {
        bottom: "0",
        left: "100%",
      };
    }
  }
};
</script>

<template>
  <section class="p-5 bg-white dark:bg-gray-700 rounded-2xl w-full">
    <div class="flex justify-between items-center mb-2">
      <h1 class="text-2xl font-semibold">
        {{ getCurrentDate(new Date(payload.start)).monthName }}
        {{ getCurrentDate(new Date(payload.start)).year }}
      </h1>
      <div class="flex items-center gap-5">
        <ScreenShot :data="screenShot" />
        <DatePicker @query-date="onQueryDate($event)" />
      </div>
    </div>

    <div
      class="overflow-x-auto relative overflow-y-scroll h-full max-h-128 w-full pr-1"
    >
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-2xl"
        ref="screenShot"
      >
        <thead
          class="text-xs bg-purple-100 dark:bg-gray-600 sticky top-0 rounded-t-3xl z-20"
        >
          <tr>
            <th
              class="py-5 flex justify-center items-center w-full"
              ref="headSize"
            >
              <button type="button" class="rounded-lg hover:bg-green-100">
                <Icon icon="material-symbols:chevron-left-rounded" width="26" />
              </button>
              <button type="button" class="rounded-lg hover:bg-green-100">
                <Icon icon="ic:round-chevron-right" width="26" />
              </button>
            </th>
            <th
              class="text-center relative"
              v-for="(item, i) in getAllDaysWeek"
              :key="i"
            >
              <div
                class="absolute top-2 left-1/3 w-min h-min rounded-lg pb-2.5 px-3 flex flex-col justify-center items-center"
                :class="[
                  getCurrentDate(new Date()).day === item.day
                    ? 'bg-purple-500 text-white shadow-lg shadow-gray-400/50 dark:shadow-gray-600'
                    : 'text-black',
                ]"
              >
                <h3 class="text-xl font-semibold">
                  {{ item.day }}
                </h3>
                <span
                  :class="{
                    'text-gray-400':
                      getCurrentDate(new Date()).day !== item.day,
                  }"
                  >{{ sliceString(item.name, 3) }}</span
                >
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="relative" ref="bodySize">
          <TimeBar
            class="absolute w-full left-0 z-10"
            :style="{
              top: getPositionTimebar(getCalendarSize.bodyHeight) + 'px',
            }"
          />
          <tr v-for="(hour, index) in personalHours" :key="index">
            <td
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white w-20"
            >
              {{ hour }}
            </td>
            <td
              class="hover:bg-gray-100 relative"
              v-for="i in daysOfWeek.length"
              :key="i"
            >
              <CreateEvent
                class="absolute inset-0"
                @created="handleGetAllEvents"
              />
            </td>
          </tr>
          <div
            class="absolute p-1 z-1 dark:text-gray-300"
            v-for="event in events"
            :key="event._id"
            :style="{
              top:
                (getCalendarSize.bodyHeight *
                  getHourIndex(getCurrentDate(event.time.start).hour)) /
                  personalHours.length +
                'px',
              right:
                ((getCalendarSize.bodyWidth - getCalendarSize.headWidth) *
                  (getDiffPeriod(event.time.date, getAllDaysWeek[6].iso)
                    .diffDays -
                    1)) /
                  daysOfWeek.length +
                'px',
              width:
                (getCalendarSize.bodyWidth - getCalendarSize.headWidth) /
                  daysOfWeek.length +
                'px',
              height:
                (getCalendarSize.bodyHeight *
                  getDiffPeriod(event.time.start, event.time.end).diffHours) /
                  18 +
                'px',
            }"
          >
            <Tooltip
              :data="event"
              :position="
                calculatePositionToolTip(
                  getHourIndex(getCurrentDate(event.time.start).hour),
                  personalHours.length,
                  getDiffPeriod(event.time.date, getAllDaysWeek[6].iso)
                    .diffDays - 1,
                  daysOfWeek.length
                )
              "
              @delete-event="handleGetAllEvents"
              @update-event="handleGetAllEvents"
            />
          </div>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0.3rem;
}
::-webkit-scrollbar-thumb {
  border-radius: 50rem;
}

table {
  border-collapse: collapse;
  // overflow: hidden;
  td,
  th {
    border: 1px solid;
    border-color: rgb(229, 231, 235);
  }

  tbody {
    tr {
      td:nth-child(1) {
        border-bottom-color: transparent;
      }
    }
  }
}
</style>
