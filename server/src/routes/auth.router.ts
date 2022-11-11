import { Application } from "express";
import verifySignUp from "../middlewares/verify_signup";
import authController from "../controllers/auth.controller";

const authRouter = (app: Application) => {
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);
};

export default authRouter;
