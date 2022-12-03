import { Router } from "express";
import { IRouter } from "../../types";
import columnController from "../../controllers/user/column.controller";

class ColumnRouter implements IRouter {
  public path = "/column";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, columnController.createColumn);

    this.router.get(
      `/project/:projectId${this.path}`,
      columnController.getAllColumns
    );

    this.router.get(`${this.path}/:id`, columnController.getColumnById);

    this.router.put(`${this.path}/:id`, columnController.updateColumn);

    this.router.delete(`${this.path}/:id`, columnController.deleteColumn);
  }
}

export default ColumnRouter;
