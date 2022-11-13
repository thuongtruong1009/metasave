import { Application } from "express";
import verifyAuth from "../middlewares/verify_auth";
import userController from "../controllers/user.controller";

const userRouter = (prefix: string, app: Application) => {
  app.get(`${prefix}/test/all`, userController.allAccess);

  app.get(
    `${prefix}/test/user`,
    [verifyAuth.verifyToken],
    userController.userBoard
  );

  app.get(
    `${prefix}/test/mod`,
    [verifyAuth.verifyToken, verifyAuth.isModerator],
    userController.moderatorBoard
  );

  app.get(
    `${prefix}/test/admin`,
    [verifyAuth.verifyToken, verifyAuth.isAdmin],
    userController.adminBoard
  );
};

export default userRouter;
