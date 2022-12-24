import { daysOfWeek, monthsOfYear } from "@/shared/time";
import { IGetCurrentDate, IListDaysOfWeek, IDayInWeek } from "@/types/calendar";

export const getWeekNo = (date: Date): number => {
  date = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  let yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  let weekNo = Math.ceil(
    ((Number(date) - Number(yearStart)) / 86400000 + 1) / 7
  );
  return weekNo + 1;
};

export const getListDaysOfWeek = (
  weekNo: number,
  year: number
): IListDaysOfWeek => {
  var simple = new Date(year, 0, 1 + (weekNo - 2) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 2);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  // return ISOweekStart;

  var days: Array<IDayInWeek> = [];
  [0, 1, 2, 3, 4, 5, 6].forEach((index) => {
    let iso = new Date(
      ISOweekStart.getFullYear(),
      ISOweekStart.getMonth(),
      ISOweekStart.getDate() + index + 1
    );
    let pre = new Date(
      ISOweekStart.getFullYear(),
      ISOweekStart.getMonth(),
      ISOweekStart.getDate() + index
    );
    let name = daysOfWeek[Math.abs(pre.getDay() % daysOfWeek.length)];
    let dayNum = Number(String(pre.getDate()).padStart(2, "0"));
    let day = dayNum < 10 ? "0" + dayNum : dayNum;
    let format = getDateFormat(
      pre.getFullYear(),
      pre.getMonth() + 1,
      pre.getDate()
    );
    days.push({ iso, format, name, day });
  });
  let startDayInWeek = days[0].format;
  let endDayInWeek = days[days.length - 1].format;
  return { startDayInWeek, endDayInWeek, days };
};

export const getCurrentDate = (time: Date | string): IGetCurrentDate => {
  let date = time ? new Date(time) : new Date();
  let minute = date.getMinutes();
  let hour = `${
    date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
  }:00`;
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
  return {
    minute,
    hour,
    day,
    month,
    year,
    totalDaysInMonth,
    dayName,
    monthName,
  };
};

type IDiffPeriod = {
  diffHours: number;
  diffDays: number;
};

export const getDiffPeriod = (
  start: string | Date,
  end: string | Date
): IDiffPeriod => {
  let startDate = start ? new Date(start) : new Date();
  let endDate = end ? new Date(end) : new Date();
  let diffHours = Math.abs(
    Number(Math.abs(endDate.getHours() - startDate.getHours()))
  );
  let diffDays = Math.abs(
    Number(Math.abs(endDate.getDate() - startDate.getDate()))
  );
  return { diffHours, diffDays };
};

export const getDateFormat = (
  year: string | number,
  month: string | number,
  day: string | number
): string => {
  let formated = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`;
  return formated;
};

export const getTimeFormat = (
  year: string | number,
  month: string | number,
  day: string | number,
  hour: string | number,
  minute?: string | number | null | undefined
): string => {
  let formated = `${year}/${month < 10 ? `0${month}` : month}/${
    day < 10 ? `0${day}` : day
  } - ${hour < 10 && hour > 0 ? `0${hour}` : hour}:${
    minute && minute < 10 ? `0${minute}` : minute
  }`;
  return formated;
};

export const getISOFormat = (date: string, hour: string | number): Date => {
  let formated = `${date}T${hour}:00`;
  return formated ? new Date(formated) : new Date();
};
