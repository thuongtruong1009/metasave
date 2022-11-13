import { Application } from "express";
import columnController from "../controllers/column.controller";

const columnRouter = (prefix: string, app: Application) => {
  app.post(`${prefix}/column`, columnController.createColumn);
};

export default columnRouter;
