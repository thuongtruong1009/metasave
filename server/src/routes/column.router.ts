import { Application } from "express";
import columnController from "../controllers/column.controller";

const columnRouter = (prefix: string, app: Application) => {
  app.post(`${prefix}/column`, columnController.createColumn);

  app.get(
    `${prefix}/project/:projectId/column`,
    columnController.getAllColumns
  );

  app.put(`${prefix}/column/:id`, columnController.updateColumn);
};

export default columnRouter;
