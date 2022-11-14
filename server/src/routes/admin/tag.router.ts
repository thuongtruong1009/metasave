import { Application } from "express";

import TagController from "../../controllers/admin/tag.controller";

const TagRouter = (prefix: string, app: Application) => {
  app.post(`${prefix}/tag`, TagController.createTag);

  app.get(`${prefix}/tag`, TagController.getAllTags);

  app.put(`${prefix}/tag/:id`, TagController.updateTag);

  app.delete(`${prefix}/tag/:id`, TagController.deleteTag);
};

export default TagRouter;
