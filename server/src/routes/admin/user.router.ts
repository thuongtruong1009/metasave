import { Application } from "express";

import userController from "../../controllers/admin/user.controller";

const UserRoutes = (prefix: string, app: Application) => {
  app.get(`${prefix}/users/total`, userController.getAllUsers);
};

export default UserRoutes;
