import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import init from "../helpers/wakeup";

function ConnectDB() {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(`${process.env.MONGO_URL}`, options);
    // init();
  } catch (err) {
    console.log("• Connect error: ", err);
    process.exit(1);
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
