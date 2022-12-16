export type IEvent = {
  id: number;
  title: string;
  start: string;
  end: string;
  color: string;
};

type IDayInWeek = {
  iso: Date;
  format: string;
  name: string;
  day: string | number;
};

type IListDaysOfWeek = {
  days: Array<IDayInWeek>;
  startDayInWeek: string;
  endDayInWeek: string;
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
};
