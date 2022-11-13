import { Application } from "express";
import projectController from "../controllers/project.controller";

const authRouter = (prefix: string, app: Application) => {
  app.post(`${prefix}/project`, projectController.createProject);
  app.get(`${prefix}/project`, projectController.getAllProjects);
  // app.get(
  //   `${prefix}/project/public`,
  //   projectController.getPublicProjects
  // );
  app.get(`${prefix}/project/:id`, projectController.getProjectById);
  app.put(`${prefix}/project/:id`, projectController.updateProject);
};

export default authRouter;
