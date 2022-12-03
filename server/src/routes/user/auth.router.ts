import { Router } from "express";
import verifySignUp from "../../middlewares/signup.middleware";
import authController from "../../controllers/user/auth.controller";
import { IRouter } from "../../types";

class AuthRouter implements IRouter {
  public path = "/auth";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(`${this.path}/signup`, [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ]);

    this.router.get(`${this.path}/verify/:token`, authController.verifyAccount);

    this.router.post(`${this.path}/signin`, authController.signin);
  }
}

export default AuthRouter;
