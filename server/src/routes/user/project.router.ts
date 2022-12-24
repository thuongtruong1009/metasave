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

    this.router.get(
      `${this.path}`,
      verifyAuth.verifyToken,
      projectController.getAllProjects
    );

    this.router.get(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      projectController.getProjectById
    );

    this.router.put(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      projectController.updateProject
    );

    this.router.delete(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      projectController.deleteProject
    );
  }
}

export default ProjectRouter;
