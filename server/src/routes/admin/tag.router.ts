import { Application } from "express";

import tagController from "../../controllers/admin/tag.controller";

const TagRouter = (prefix: string, app: Application) => {
  app.post(`${prefix}/tag`, tagController.createTag);

  app.get(`${prefix}/tag`, tagController.getAllTags);

  app.put(`${prefix}/tag/:id`, tagController.updateTag);

  app.delete(`${prefix}/tag/:id`, tagController.deleteTag);
};

export default TagRouter;
