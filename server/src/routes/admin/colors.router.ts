import { Router } from "express";
import { IRouter } from "../../types";

import colorsController from "../../controllers/admin/colors.controller";

class ColorsRouter implements IRouter {
  public path = "/colors";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, colorsController.createColor);

    this.router.get(`${this.path}`, colorsController.getAllColors);

    this.router.put(`${this.path}/:id`, colorsController.updateColor);

    this.router.delete(`${this.path}/:id`, colorsController.deleteColor);
  }
}

export default ColorsRouter;
