type ICardGroupTotal = {
  _id: string;
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
    totalCard: number;
    totalCardByTag: Array<ICardGroupTotal>;
    totalCardByStatus: Array<ICardGroupTotal>;
  };
};
