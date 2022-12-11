import { daysOfWeek, monthsOfYear } from "@/shared/time";
import { IGetCurrentDate, IGetListDaysOfWeek } from "@/types/calendar";

export const getCurrentWeekNumber = (date: Date): number => {
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

var days: Array<IGetListDaysOfWeek> = [];
export const getListDaysOfWeek = (date: Date): Array<IGetListDaysOfWeek> => {
  [0, 1, 2, 3, 4, 5, 6].forEach((index) => {
    let pre = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + index - 1
    );
    let iso = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + index
    );
    let name = daysOfWeek[pre.getDay()];
    let dayNum = Number(String(pre.getDate()).padStart(2, "0"));
    let day = dayNum < 10 ? "0" + dayNum : dayNum;
    days.push({ iso, name, day });
  });
  return days;
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
  let startDayOfWeek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay()
  );
  let weekNo = getCurrentWeekNumber(date);
  let weeks = getListDaysOfWeek(startDayOfWeek);

  return {
    minute,
    hour,
    day,
    month,
    year,
    totalDaysInMonth,
    dayName,
    monthName,
    weekNo,
    weeks,
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

export const getDateFormat = (
  year: string | number,
  month: string | number,
  day: string | number
): string => {
  let formated = `${year}-${month}-${day < 10 ? `0${day}` : day}`;
  return formated;
};

export const getISOFormat = (date: string, hour: string | number): string => {
  let formated = `${date}T${hour}:00`;
  return formated;
};

// {
//   hour: 23,
//   day: 11,
//   month: 12,
//   year: 2022,
//   totalDaysInMonth: 31,
//   dayName: 'Sunday',
//   monthName: 'December',
//   weekNo: 50,
//   weeks: [
//     { iso: 2022-12-27T17:00:00.000Z, name: 'Tuesday', day: 27 },
//     { iso: 2022-12-28T17:00:00.000Z, name: 'Wednesday', day: 28 },
//     { iso: 2022-12-29T17:00:00.000Z, name: 'Thursday', day: 29 },
//     { iso: 2022-12-30T17:00:00.000Z, name: 'Friday', day: 30 },
//     { iso: 2022-12-31T17:00:00.000Z, name: 'Saturday', day: 31 },
//     { iso: 2023-01-01T17:00:00.000Z, name: 'Sunday', day: '01' },
//     { iso: 2023-01-02T17:00:00.000Z, name: 'Monday', day: '02' }
//   ]
// }
