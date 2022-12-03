import { Router } from "express";
import { IRouter } from "../../types";

import tagController from "../../controllers/admin/tag.controller";

class TagsRouter implements IRouter {
  public path = "/tag";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, tagController.createTag);

    this.router.get(`${this.path}`, tagController.getAllTags);

    this.router.put(`${this.path}/:id`, tagController.updateTag);

    this.router.delete(`${this.path}/:id`, tagController.deleteTag);
  }
}

export default TagsRouter;
