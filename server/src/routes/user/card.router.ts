import { Application } from "express";
import CardController from "../../controllers/user/card.controller";

const cardRouter = (prefix: string, app: Application) => {
  app.post(`${prefix}/card`, CardController.createCard);
  app.get(`${prefix}/column/:columnId/card`, CardController.getAllCards);
  app.get(`${prefix}/card/:id`, CardController.getCardById);
  app.put(`${prefix}/card`, CardController.updateCard);
  app.delete(`${prefix}/card/:id`, CardController.deleteCard);
};

export default cardRouter;
