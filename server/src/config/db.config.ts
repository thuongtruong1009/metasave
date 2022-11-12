import mongoose, { Error } from "mongoose";

import db from "../models";

function initial() {
  db.role.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      new db.role({
        name: "user",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new db.role({
        name: "moderator",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new db.role({
        name: "admin",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

function ConnectDB(mongoURL: string) {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // poolSize: parseInt(process.env.POOL_SIZE!),
  };

  try {
    mongoose.connect(mongoURL, options);
    initial();
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
