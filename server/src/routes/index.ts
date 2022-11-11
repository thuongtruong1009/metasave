import { Request, Response, Application } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import { INext } from "../types";

const routes = (app: Application) => {
  app.use(function (req: Request, res: Response, next: INext) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  authRouter(app);
  userRouter(app);
};

export default routes;
