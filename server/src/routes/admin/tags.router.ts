import { Router } from "express";
import { IRouter } from "../../types";

import tagsController from "../../controllers/admin/tags.controller";

class TagsRouter implements IRouter {
  public path = "/tags";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, tagsController.createTag);

    this.router.get(`${this.path}`, tagsController.getAllTags);

    this.router.put(`${this.path}/:id`, tagsController.updateTag);

    this.router.delete(`${this.path}/:id`, tagsController.deleteTag);
  }
}

export default TagsRouter;
