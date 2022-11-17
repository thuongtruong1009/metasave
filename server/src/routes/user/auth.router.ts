import { Application } from "express";
import verifySignUp from "../../middlewares/signup.middleware";
import authController from "../../controllers/user/auth.controller";

const authRouter = (prefix: string, app: Application) => {
  app.post(
    `${prefix}/auth/signup`,
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    authController.signup
  );

  app.post(`${prefix}/auth/signin`, authController.signin);
};

export default authRouter;
