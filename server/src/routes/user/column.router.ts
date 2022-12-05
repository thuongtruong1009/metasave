import { Router } from "express";
import { IRouter } from "../../types";
import boardController from "../../controllers/user/board.controller";

class BoardRouter implements IRouter {
  public path = "/board";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, boardController.createBoard);

    this.router.get(
      `/project/:projectId${this.path}`,
      boardController.getAllBoards
    );

    this.router.get(`${this.path}/:id`, boardController.getBoardById);

    this.router.put(`${this.path}/:id`, boardController.updateBoard);

    this.router.delete(`${this.path}/:id`, boardController.deleteBoard);
  }
}

export default BoardRouter;
