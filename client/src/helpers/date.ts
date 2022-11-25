import { daysOfWeek, monthsOfYear } from "@/shared/time";
import { IGetCurrentDate } from "@/types/calendar";

export const getCurrentDate = (time: Date | string): IGetCurrentDate => {
  let date = time ? new Date(time) : new Date();
  let minute = date.getMinutes();
  let hour = String(date.getHours()) + ":00";
  let day = Number(String(date.getDate()).padStart(2, "0"));
  let dayName = daysOfWeek[date.getDay()];
  let totalDaysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  let month = Number(String(date.getMonth() + 1).padStart(2, "0"));
  let monthName = monthsOfYear[date.getMonth()];
  let year = Number(date.getFullYear());
  let startWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay()
  );
  let endWeek = new Date(
    startWeek.getFullYear(),
    startWeek.getMonth(),
    startWeek.getDate() + 6
  );
  let startDayInWeek = Number(String(startWeek.getDate()).padStart(2, "0")) + 1;
  let endDayInWeek = Number(String(endWeek.getDate()).padStart(2, "0")) + 1;

  return {
    minute,
    hour,
    day,
    month,
    year,
    totalDaysInMonth,
    dayName,
    monthName,
    startDayInWeek,
    endDayInWeek,
  };
};

export const getDiffPeriod = (
  start: string,
  end: string
): Record<"diffHours" | "diffDays", number> => {
  let startDate = start ? new Date(start) : new Date();
  let endDate = end ? new Date(end) : new Date();
  let diffHours = Number(Math.abs(endDate.getHours() - startDate.getHours()));
  let diffDays = Number(Math.abs(endDate.getDate() - startDate.getDate()));
  return { diffHours, diffDays };
};
