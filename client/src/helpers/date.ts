import { daysOfWeek, monthsOfYear } from "@/shared/time";

type IGetDate = {
  day: number;
  month: number;
  year: number;
  totalDaysInMonth: number;
  dayName: string;
  monthName: string;
  startDayInWeek: number;
  endDayInWeek: number;
};

export const getDate = (): IGetDate => {
  let date = new Date();
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
