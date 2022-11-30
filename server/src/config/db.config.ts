import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { initRole, initTag } from "../helpers/wakeup";

function ConnectDB() {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.MONGO_URL, options);
    // initRole();
    // initTag();
  } catch (error) {
    console.log("• Connect error: ", error);
    process.exit();
  }
}

const connect = mongoose.connection;
connect.on("error", (): void => {
  console.error.bind(console, "MongoDB connection error:");
});
connect.on("open", (): void => {
  console.log("• Database connected");
});

export default ConnectDB;
