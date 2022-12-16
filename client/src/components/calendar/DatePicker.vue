<script setup lang="ts">
import { ref } from "vue";
import { getDateFormat } from "@/helpers/date";

const isDark = document.documentElement.classList.contains("dark")
  ? true
  : false;

type IQueryDate = {
  startDate: string;
  endDate: string;
};

const emits = defineEmits<{
  (e: "query-date", dataModel: IQueryDate): void;
}>();

const date = ref([new Date(), new Date()]);

const handleDate = (dataModel: any) => {
  date.value = dataModel;
  const startDate = getDateFormat(
    dataModel[0].getFullYear(),
    dataModel[0].getMonth() + 1,
    dataModel[0].getDate()
  );
  const endDate = getDateFormat(
    dataModel[1].getFullYear(),
    dataModel[1].getMonth() + 1,
    dataModel[1].getDate()
  );
  console.log(dataModel);
  emits("query-date", { startDate, endDate });
};
</script>

<template>
  <Datepicker
    v-model="date"
    range
    auto-range="6"
    :dark="isDark"
    noHoursOverlay="false"
    inputClassName="dp-custom-input"
    menuClassName="dp-custom-menu"
    calendarCellClassName="dp-custom-cell"
    :enableTimePicker="false"
    @update:modelValue="handleDate"
  />
</template>

<style lang="scss">
.dp-custom-input {
  box-shadow: 0 0 0 1px #e2e8f0;
  width: 16rem;
}
.dp-custom-menu {
  border-radius: 1.2rem;
  padding: 0.8rem;
}
.dp-custom-cell {
  border-radius: 5px;
}
</style>
