import mongoose from "mongoose";

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
    // seed somethings before starting the server;
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
