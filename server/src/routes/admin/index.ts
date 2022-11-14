import { Request, Response, NextFunction, Application } from "express";
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
};

export default adminRoutes;
