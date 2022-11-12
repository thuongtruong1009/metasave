import { Request, Response, Application } from "express";
import { INext } from "../types";
import authRouter from "./auth.router";
import userRouter from "./user.router";
// import projectRouter from "./project.router";

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
  // projectRouter(app);
};

export default routes;
