import type { IColumn } from "./index";

export type IScene = {
  type: string;
  props: {
    orientation: string;
  };
  category: string;
  name: string;
  description: string;
  background: string;
  customBackground?: string;
  children: Array<IColumn> | any;
};
