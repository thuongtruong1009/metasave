export type IEvent = {
  id: number;
  title: string;
  start: string;
  end: string;
  color: string;
};

export type IGetCurrentDate = {
  minute: number;
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
