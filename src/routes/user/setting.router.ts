import { Router } from "express";
import { IRouter } from "../../types";

import settingController from "../../controllers/user/setting.controller";
import verifyAuth from "../../middlewares/authen.middleware";
import { uploadAvatar, uploadEventImg } from "../../decorators/file";

class SettingRouter implements IRouter {
  public path = "/setting";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/resources/avatars`,
      verifyAuth.verifyToken,
      uploadAvatar,
      settingController.uploadSingleResource
    );

    this.router.post(
      `${this.path}/resources/events`,
      verifyAuth.verifyToken,
      uploadEventImg,
      settingController.uploadSingleResource
    );

    this.router.delete(
      `${this.path}/resources`,
      verifyAuth.verifyToken,
      settingController.deleteResource
    );

    this.router.delete(
      `${this.path}/:id`,
      verifyAuth.verifyToken,
      settingController.deleteUser
    );

    this.router.get(
      `${this.path}/colors`,
      settingController.getColorCollection
    );

    this.router.get(`${this.path}/tags`, settingController.getTagCollection);
  }
}

export default SettingRouter;
