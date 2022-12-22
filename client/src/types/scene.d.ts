import type { IColumn } from "./column.d.ts";

export type IBoardPayload = {
  _id: string;
  type: string;
  props: {
    orientation: string;
  };
  name: string;
  isFavorite: boolean;
  background: {
    _id: string;
    name: string;
  };
  customBackground: string;
  groups: Array<IColumn> | any;
};
