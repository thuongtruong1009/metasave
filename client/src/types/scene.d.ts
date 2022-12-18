import type { IColumn } from "./column.d.ts";

export type IBoardPayload = {
  _id: string;
  type: string;
  props: {
    orientation: string;
  };
  name: string;
  description: string;
  isFavorite: boolean;
  background: {
    _id: string;
    name: string;
  };
  customBackground?: string;
  createdAt: string;
  updatedAt: string;
  groups: Array<IColumn> | any;
};
