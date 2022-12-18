import type { ICard } from "./card";

export type IColumn = {
  _id: number;
  type: string;
  icon: string;
  name: string;
  props: {
    orientation: string;
  };
  children: Array<ICard>;
};
