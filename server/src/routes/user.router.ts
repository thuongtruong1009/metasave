import { Application } from "express";
import userController from "../controllers/user.controller";

const userRouter = (prefix: string, app: Application) => {
  app.delete(`${prefix}/user/:id`, userController.deleteUser);
};

export default userRouter;
