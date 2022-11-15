import { Application } from "express";

import statisticalController from "../../controllers/admin/statistical.controller";

const CardRouter = (prefix: string, app: Application) => {
  app.get(`${prefix}/overview`, statisticalController.getOverview);
};

export default CardRouter;
