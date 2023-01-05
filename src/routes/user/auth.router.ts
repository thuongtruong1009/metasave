import { Router } from "express";
import verifySignUp from "../../middlewares/signup.middleware";
import authController from "../../controllers/user/auth.controller";
import { IRouter } from "../../types";
import verifyAuth from "../../middlewares/authen.middleware";

class AuthRouter implements IRouter {
  public path = "/auth";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted,
      ],
      authController.signup
    );

    this.router.get(`${this.path}/verify/:token`, authController.verifyAccount);

    this.router.post(`${this.path}/signin`, authController.signin);

    this.router.post(
      `${this.path}/refresh-token`,
      verifyAuth.verifyToken,
      authController.refreshToken
    );

    this.router.post(
      `${this.path}/logout`,
      verifyAuth.verifyToken,
      authController.logout
    );

    this.router.post(
      `${this.path}/logout-all`,
      verifyAuth.verifyToken,
      authController.logoutAllDevice
    );
  }
}

export default AuthRouter;
