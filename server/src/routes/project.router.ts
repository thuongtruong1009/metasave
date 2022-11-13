import { Request, Response, Application } from "express";
import projectController from "../controllers/project.controller";

const authRouter = (prefix: string, app: Application) => {
  app.post(`${prefix}/project`, projectController.createProject);
  app.get(`${prefix}/project`, projectController.getAllProjects);
};

export default authRouter;
