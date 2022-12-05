import { Router } from "express";
import { IRouter } from "../../types";

import usersController from "../../controllers/admin/users.controller";

class UsersRouter implements IRouter {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, usersController.getAllUsers);

    this.router.delete(`${this.path}/:id`, usersController.deleteUser);
  }
}

export default UsersRouter;
