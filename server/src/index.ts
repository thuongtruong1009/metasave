import app from "./config/app.config";
import * as dotenv from "dotenv";
dotenv.config();

app.listen(process.env.APP_PORT, (): void => {
  console.log(`• Server is running on port ${process.env.APP_PORT}`);
});
