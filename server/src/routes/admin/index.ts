import { Request, Response, NextFunction, Application } from "express";
import CardRouter from "./statistical.router";
import TagRouter from "./tag.router";

const prefix = "/api/admin";

const adminRoutes = (app: Application) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  TagRouter(prefix, app);
  CardRouter(prefix, app);
};

export default adminRoutes;
