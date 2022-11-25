<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { useElementSize } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import TimeMenu from "@/components/calendar/TimeMenu.vue";
import { personalHours, daysOfWeek } from "@/shared/time";
import { getCurrentDate, getDiffPeriod } from "@/helpers/date";
import { truncateString, sliceString } from "@/utils/string";
import TimeBar from "@/components/calendar/TimeBar.vue";
import { IEvent } from "@/types/calendar";

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

const listEvents: Array<IEvent> = reactive([
  {
    id: 1,
    title: "Meeting with client",
    start: "2022-11-21T11:00:00",
    end: "2022-11-21T13:00:00",
    color: "blue-100",
  },
  {
    id: 2,
    title: "Meeting with client",
    start: "2022-11-24T08:00:00",
    end: "2022-11-24T10:00:00",
    color: "green-100",
  },
  {
    id: 2,
    title: "Meeting with client",
    start: "2022-11-27T08:00:00",
    end: "2022-11-27T10:00:00",
    color: "green-100",
  },
]);
</script>

<template>
  <section class="ml-5 p-5 bg-white dark:bg-gray-700 rounded-2xl w-full">
    <div class="flex justify-between items-center mb-5">
      <h1 class="text-2xl font-semibold">
        {{ getCurrentDate().monthName }} {{ getCurrentDate().year }}
      </h1>
      <TimeMenu />
    </div>

    <div
      class="overflow-x-auto relative overflow-y-scroll h-full max-h-128 w-full pr-1"
    >
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-2xl"
      >
        <thead
          class="text-xs bg-purple-100 dark:bg-gray-600 sticky top-0 rounded-t-3xl z-10"
        >
          <tr>
            <th class="py-5 flex justify-center w-full" ref="headSize">
              <button type="button" class="rounded-lg hover:bg-green-100">
                <Icon icon="material-symbols:chevron-left-rounded" width="26" />
              </button>
              <button type="button" class="rounded-lg hover:bg-green-100">
                <Icon icon="ic:round-chevron-right" width="26" />
              </button>
            </th>
            <th
              class="text-center relative"
              v-for="(day, i) in daysOfWeek"
              :key="i"
            >
              <div
                class="absolute top-2 left-1/3 w-min h-min rounded-lg py-1 px-3 flex flex-col justify-center items-center"
                :class="[
                  getCurrentDate(new Date()).day ===
                  getCurrentDate(new Date()).startDayInWeek + i
                    ? 'bg-purple-500 text-white'
                    : 'text-black',
                ]"
              >
                <h3 class="text-xl font-semibold">
                  {{ getCurrentDate(new Date()).startDayInWeek + i }}
                </h3>
                <span
                  :class="{
                    'text-gray-400':
                      getCurrentDate(new Date()).day !==
                      getCurrentDate(new Date()).startDayInWeek + i,
                  }"
                  >{{ sliceString(day, 3) }}</span
                >
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="relative" ref="bodySize">
          <TimeBar
            class="absolute w-full left-0"
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
            <td class="py-4 px-6" v-for="i in daysOfWeek.length" :key="i"></td>
          </tr>
          <div
            class="absolute p-1 z-0"
            v-for="event in listEvents"
            :key="event.id"
            :style="{
              right:
                ((getCalendarSize.bodyWidth - getCalendarSize.headWidth) *
                  (getCurrentDate(new Date()).endDayInWeek -
                    getCurrentDate(new Date(event.start)).day)) /
                  daysOfWeek.length +
                'px',
              top:
                (getCalendarSize.bodyHeight *
                  getHourIndex(getCurrentDate(event.start).hour)) /
                  personalHours.length +
                'px',
              width:
                (getCalendarSize.bodyWidth - getCalendarSize.headWidth) /
                  daysOfWeek.length +
                'px',
              height:
                (getCalendarSize.bodyHeight *
                  getDiffPeriod(event.start, event.end).diffHours) /
                  18 +
                'px',
            }"
          >
            <div
              class="w-full h-full rounded-lg break-words whitespace-pre-wrap p-1.5 text-sm cursor-pointer hover:shadow-lg"
              :class="`bg-${event.color}`"
            >
              <h1 class="font-semibold">
                {{ event.title
                }}{{ getPositionTimebar(getCalendarSize.bodyHeight) }}
              </h1>
              <p class="text-xs">
                {{ getCurrentDate(event.start).hour }}:
                {{ getCurrentDate(event.end).hour }}
              </p>
            </div>
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
