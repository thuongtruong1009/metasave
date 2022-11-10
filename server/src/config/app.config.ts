import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import envConfig from "./environment.config";
import ConnectDB from "./db.config";
import authRouter from "../routes/auth.router";
import userRouter from "../routes/user.router";

const app = express();

ConnectDB(envConfig.mongoURL);

const corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../../logs/access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

authRouter(app);
userRouter(app);

export default app;
