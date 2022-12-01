<script setup>
import { ref } from "vue";

const isDark = document.documentElement.classList.contains("dark")
  ? true
  : false;

const date = ref();

const handleDate = (modelData) => {
  date.value = modelData;
  console.log(modelData);
};
</script>

<template>
  <Datepicker
    :value="date"
    range
    auto-range="6"
    :dark="isDark"
    noHoursOverlay="false"
    inputClassName="dp-custom-input"
    menuClassName="dp-custom-menu"
    calendarCellClassName="dp-custom-cell"
    :enableTimePicker="false"
    hideOffsetDates
    @update:modelValue="handleDate"
  />
</template>

<style lang="scss">
.dp-custom-input {
  box-shadow: 0 0 0 1px #e2e8f0;
}
.dp-custom-menu {
  border-radius: 1.2rem;
  padding-bottom: 0.8rem;
}
.dp-custom-cell {
  border-radius: 5px;
}
</style>
