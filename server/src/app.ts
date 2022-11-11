const express = require("express");
const { Application } = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
import ConnectDB from "./config/db.config";
import envConfig from "./config/environment.config";
// const { ICorsOptions } = require("./types");
import routes from "./routes";

// const app = require("./config/app.config");
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
  path.join(__dirname, "../logs/access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

routes(app);

app.listen(envConfig.port, (): void => {
  console.log(`• Server is running on port ${envConfig.port}`);
});
