import { Router } from "express";
import { IRouter } from "../../types";
import statisticalController from "../../controllers/admin/statistical.controller";

class StatisticalRouter implements IRouter {
  public path = "/overview";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, statisticalController.getOverview);
  }
}

export default StatisticalRouter;
