import compression from "compression";
import cookieParser from "cookie-parser";
import fs from "fs-extra";
import cors from "cors";
import express, { Request, Response } from "express";
import path from "node:path";
import helmet from "helmet";
import hpp from "hpp";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import ConnectDB from "./db.config";
import { IRouter } from "../types";
import morgan from "morgan";
import ErrorHandler from "../middlewares/error.middleware";
import { rateLimiterMiddleware } from "../middlewares/rate.middleware";
import { capitializeString } from "../utils/string";

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
    this.initializeErrorHandling();
  }

  public listen() {
    try {
      this.app.listen(this.port, () => {
        console.log(`• App listening on the port ${this.port}`);
      });
    } catch (error) {
      console.log("• Cannot connect to the server");
    }
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }

  public getServer() {
    return this.app;
  }

  private corsOptions() {
    const options = {
      origin: `${process.env.ORIGIN}`.split(","),
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
      ],
      credentials: true,
      methods: "GET,PUT,PATCH,POST,DELETE",
    };
    return options;
  }

  private initializeMiddlewares() {
    this.app.use(cors<Request>(this.corsOptions()));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(rateLimiterMiddleware);
    this.app.use(morgan("combined", { stream: this.writeLogs("access") }));
    this.app.disable("x-powered-by");

    this.app.use(express.static(path.join(__dirname, "../../public")));
  }

  private writeLogs(fileName: string) {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, `../../logs/${fileName}.log`),
      { flags: "a" }
    );
    return accessLogStream;
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
          title: `${capitializeString(process.env.DB_NAME)} - API`,
          version: "1.0.0",
          description: `The API documentation for ${process.env.DB_NAME} server`,
          termsOfService: "http://example.com/terms/",
          contact: {
            name: "API Support",
            url: "http://www.example.com/support",
            email: "thuongtruong1009@proton.me",
          },
          license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html",
          },
          schemes:
            process.env.NODE_ENV === "development" ? ["http"] : ["https"],
          server: [
            {
              url: "{protocol}://api.example.com",
              variables: {
                protocol: {
                  enum: ["http", "https"],
                  default: "https",
                },
              },
            },
          ],
        },
      },
      apis: ["swagger.yaml"],
    };
    const swaggerSpec = swaggerJSDoc(options);
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorHandler);
  }
}

export default App;
