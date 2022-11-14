import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Application } from "express";
import { ICorsOptions } from "../types";

import ConnectDB from "../config/db.config";
import envConfig from "../config/environment.config";
import userRoutes from "../routes/user";
import adminRoutes from "../routes/admin";

const app: Application = express();

ConnectDB(envConfig.mongoURL);

const corsOptions: ICorsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../../logs/access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

userRoutes(app);
adminRoutes(app);

export default app;
