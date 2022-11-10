import verifyAuth from "../middlewares/verify_auth";
import userController from "../controllers/user.controller";

const userRouter = (app: any) => {
  app.use(function (req: any, res: any, next: any) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", userController.allAccess);

  app.get("/api/test/user", [verifyAuth.verifyToken], userController.userBoard);

  app.get(
    "/api/test/mod",
    [verifyAuth.verifyToken, verifyAuth.isModerator],
    userController.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [verifyAuth.verifyToken, verifyAuth.isAdmin],
    userController.adminBoard
  );
};

export default userRouter;
