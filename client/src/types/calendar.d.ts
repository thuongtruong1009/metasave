export type IEvent = {
  id: number;
  title: string;
  start: string;
  end: string;
  color: string;
};

type IGetListDaysOfWeek = {
  iso: Date;
  name: string;
  day: string | number;
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
  weekNo: number;
  weeks: Array<IGetListDaysOfWeek>;
};
