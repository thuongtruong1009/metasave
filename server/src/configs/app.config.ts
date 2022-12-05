import compression from "compression";
import cookieParser from "cookie-parser";
import fs from "fs";
import cors from "cors";
import express from "express";
import path from "node:path";
import helmet from "helmet";
import hpp from "hpp";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import ConnectDB from "./db.config";
import { IRouter } from "../types";
import morgan from "morgan";

class App {
  public app: express.Application;
  public env: string;
  public port: string;

  constructor(userRoutes: IRouter[], adminRoutes: IRouter[]) {
    this.app = express();
    this.env = `${process.env.NODE_ENV}`;
    this.port = `${process.env.APP_PORT}`;

    this.initializeMiddlewares();
    this.initializeRoutes(userRoutes, adminRoutes);
    this.initializeSwagger();
    ConnectDB();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`• App listening on the port ${this.port}`);
    });
    this.app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: `${process.env.ORIGIN}`, credentials: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, "../../logs/access.log"),
      { flags: "a" }
    );
    this.app.use(morgan("combined", { stream: accessLogStream }));

    this.app.use(express.static(path.join(__dirname, "../../public")));
  }

  private initializeRoutes(userRoutes: IRouter[], adminRoutes: IRouter[]) {
    userRoutes.forEach((route: IRouter) => {
      this.app.use("/api", route.router);
    });
    adminRoutes.forEach((route: IRouter) => {
      this.app.use("/api/admin", route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: `${process.env.DB_NAME}-API`,
          version: "1.0.0",
          description: "The API documentation for Boarder server",
        },
      },
      apis: ["swagger.yaml"],
    };
    const swaggerSpec = swaggerJSDoc(options);
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

export default App;
