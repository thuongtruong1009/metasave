import Router from "express";

export type IRouter = {
  path?: string;
  router: Router;
};

export type ICorsOptions = {
  origin: string;
  credentials: boolean;
};

export type IDecoded = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};
