import { Router } from "express";
import { IRouter } from "../../types";
import CardController from "../../controllers/user/card.controller";

class CardRouter implements IRouter {
  public path = "/card";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.get(
      `/column/:columnId${this.path}`,
      CardController.getAllCards
    );

    this.router.post(`${this.path}`, CardController.createCard);

    this.router.get(`${this.path}/:id`, CardController.getCardById);

    this.router.put(`${this.path}`, CardController.updateCard);

    this.router.delete(`${this.path}/:id`, CardController.deleteCard);
  }
}

export default CardRouter;
