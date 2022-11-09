import type { ICard } from "./index";

export type IColumn = {
  id: string;
  type: string;
  icon: string;
  name: string;
  props: {
    orientation: string;
  };
  children: Array<ICard>;
};
