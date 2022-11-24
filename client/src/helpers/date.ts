import { daysOfWeek, monthsOfYear } from "@/shared/time";

type IGetDate = {
  hour: string;
  day: number;
  month: number;
  year: number;
  totalDaysInMonth: number;
  dayName: string;
  monthName: string;
  startDayInWeek: number;
  endDayInWeek: number;
};

export const getCurrentDate = (time: any): IGetDate => {
  let date = time ? new Date(time) : new Date();
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
  start: Date,
  end: Date
): Record<string, string> => {
  let startDate = start ? new Date(start) : new Date();
  let endDate = end ? new Date(end) : new Date();
  let diffHours = String(Math.abs(endDate.getHours() - startDate.getHours()));
  let diffDays = String(Math.abs(endDate.getDate() - startDate.getDate()));
  return { diffHours, diffDays };
};
