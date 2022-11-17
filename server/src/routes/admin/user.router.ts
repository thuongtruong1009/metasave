import { Application } from "express";

import userController from "../../controllers/admin/user.controller";

const UserRoutes = (prefix: string, app: Application) => {
  app.get(`${prefix}/users`, userController.getAllUsers);

  app.delete(`${prefix}/users/:id`, userController.deleteUser);
};

export default UserRoutes;
