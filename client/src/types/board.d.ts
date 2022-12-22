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

export type IGroupCardByTotal = {
  totalCard: number;
  totalTag: number;
  totalStatus: number;
};

export type IGroupCardByTag = {
  _id: {
    _id: string;
    color: string;
  };
  total: number;
};

export type IGroupCardByStatus = {
  _id: number;
  total: number;
};

export type IBoardInfoPayget = {
  board: {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  info: {
    total: IGroupCardByTotal;
    groupCardByTag: Array<IGroupCardByTag>;
    groupCardByStatus: Array<IGroupCardByStatus>;
  };
};
