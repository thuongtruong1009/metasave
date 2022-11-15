import { Request, Response, Application, NextFunction } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import projectRouter from "./project.router";
import columnRouter from "./column.router";
import cardRouter from "./card.router";

const prefix = "/api";

const userRoutes = (app: Application) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  authRouter(prefix, app);
  userRouter(prefix, app);
  projectRouter(prefix, app);
  columnRouter(prefix, app);
  cardRouter(prefix, app);
};

export default userRoutes;
