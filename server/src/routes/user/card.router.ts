import { Router } from "express";
import { IRouter } from "../../types";
import CardController from "../../controllers/user/card.controller";
import verifyAuth from "../../middlewares/authen.middleware";

class CardRouter implements IRouter {
  public path = "/card";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get(
      `/board/:boardId${this.path}`,
      verifyAuth.verifyToken,
      CardController.getAllCards
    );

    this.router.post(
      `${this.path}`,
      verifyAuth.verifyToken,
      CardController.createCard
    );

    this.router.get(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      CardController.getCardById
    );

    this.router.put(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      CardController.updateCard
    );

    this.router.delete(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      CardController.deleteCard
    );
  }
}

export default CardRouter;
