export type INext = () => void | Promise<void>;

export type IDecoded = {
  id: string;
  iat: number;
  exp: number;
};
