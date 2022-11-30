import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Application } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import { ICorsOptions } from "../types";
import ConnectDB from "../config/db.config";
import userRoutes from "../routes/user";
import adminRoutes from "../routes/admin";

const app: Application = express();

ConnectDB();

const corsOptions: ICorsOptions = {
  origin: process.env.ORIGIN,
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

app.get("", (req, res) => {
  res.send("Hello World");
});

userRoutes(app);
adminRoutes(app);

export default app;
