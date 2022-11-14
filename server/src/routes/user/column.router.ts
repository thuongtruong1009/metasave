import { Application } from "express";
import columnController from "../../controllers/user/column.controller";

const columnRouter = (prefix: string, app: Application) => {
  app.post(`${prefix}/column`, columnController.createColumn);

  app.get(
    `${prefix}/project/:projectId/column`,
    columnController.getAllColumns
  );

  app.get(`${prefix}/column/:id`, columnController.getColumnById);

  app.put(`${prefix}/column/:id`, columnController.updateColumn);

  app.delete(`${prefix}/column/:id`, columnController.deleteColumn);
};

export default columnRouter;
