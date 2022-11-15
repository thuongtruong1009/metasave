import { Application } from "express";

import cardController from "../../controllers/admin/statistical.controller";

const CardRouter = (prefix: string, app: Application) => {
  app.get(`${prefix}/overview`, cardController.getOverview);
};

export default CardRouter;
