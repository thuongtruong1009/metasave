import { Router } from "express";
import { IRouter } from "../../types";

import eventController from "../../controllers/user/event.controller";
import verifyAuth from "../../middlewares/authen.middleware";

class EventRouter implements IRouter {
  public path = "/event";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      verifyAuth.verifyToken,
      eventController.createEvent
    );
    this.router.get(
      `${this.path}`,
      verifyAuth.verifyToken,
      eventController.getAllEvents
    );
    this.router.get(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      eventController.getEventById
    );
    this.router.put(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      eventController.updateEvent
    );
    this.router.delete(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      eventController.deleteEvent
    );
  }
}

export default EventRouter;
