import { Router } from "express";
import { IRouter } from "../../types";
import projectController from "../../controllers/user/project.controller";
import verifyAuth from "../../middlewares/authen.middleware";

class ProjectRouter implements IRouter {
  public path = "/project";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      verifyAuth.verifyToken,
      projectController.createProject
    );

    this.router.get(`${this.path}`, projectController.getAllProjects);

    this.router.get(`${this.path}/:id`, projectController.getProjectById);

    this.router.put(`${this.path}/:id`, projectController.updateProject);

    this.router.delete(`${this.path}/:id`, projectController.deleteProject);
  }
}

export default ProjectRouter;
