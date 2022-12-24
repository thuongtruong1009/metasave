import { Router } from "express";
import { IRouter } from "../../types";
import boardController from "../../controllers/user/board.controller";
import verifyAuth from "../../middlewares/authen.middleware";

class BoardRouter implements IRouter {
  public path = "/board";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      verifyAuth.verifyToken,
      boardController.createBoard
    );

    this.router.get(
      `/project/:projectId${this.path}/all`,
      verifyAuth.verifyToken,
      boardController.getAllBoards
    );

    this.router.get(
      `/project/:projectId${this.path}/name`,
      verifyAuth.verifyToken,
      boardController.getListBoardsName
    );

    this.router.get(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      boardController.getBoardById
    );

    this.router.get(
      `${this.path}/:id/info`,
      verifyAuth.verifyToken,
      boardController.getBoardInfoById
    );

    this.router.put(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      boardController.updateBoard
    );

    this.router.delete(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      boardController.deleteBoard
    );
  }
}

export default BoardRouter;
