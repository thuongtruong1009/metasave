import Router from "express";

export type IRouter = {
  path?: string;
  router: Router;
};
