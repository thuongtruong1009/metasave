import { Application } from "express";
import verifyAuth from "../middlewares/verify_auth";
import userController from "../controllers/user.controller";

const userRouter = (app: Application) => {
  app.get("/api/test/all", userController.allAccess);

  app.get("/api/test/user", [verifyAuth.verifyToken], userController.userBoard);

  app.get(
    "/api/test/mod",
    [verifyAuth.verifyToken, verifyAuth.isModerator],
    userController.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [verifyAuth.verifyToken, verifyAuth.isAdmin],
    userController.adminBoard
  );
};

export default userRouter;
