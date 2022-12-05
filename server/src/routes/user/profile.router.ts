import { Router } from "express";
import { IRouter } from "../../types";
import profileController from "../../controllers/user/profile.controller";

class ProfileRouter implements IRouter {
  public path = "/user";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.delete(`${this.path}/:id`, profileController.deleteUser);
  }
}

export default ProfileRouter;
