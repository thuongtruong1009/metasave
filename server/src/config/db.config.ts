import mongoose from "mongoose";

import model from "../models";

const Role = model.role;

function initial() {
  Role.estimatedDocumentCount((err: any, count: any) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err: any) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

const ConnectDB = async (mongoURL: string) => {
  const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // poolSize: parseInt(process.env.POOL_SIZE!),
  };

  try {
    mongoose.connect(mongoURL, options);
    console.log("Database connected");
    // void initial();
  } catch (error) {
    console.log("Connect error: ", error);
    process.exit();
  }
};

export default ConnectDB;
