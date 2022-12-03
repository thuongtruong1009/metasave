import { Router } from "express";
import { IRouter } from "../../types";
import userController from "../../controllers/user/user.controller";

class ProfileRouter implements IRouter {
  public path = "/user";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.delete(`${this.path}/:id`, userController.deleteUser);
  }
}

export default ProfileRouter;
