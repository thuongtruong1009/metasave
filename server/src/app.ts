import envConfig from "./config/environment.config";
import app from "./config/app.config";

app.listen(envConfig.port, (): void => {
  console.log(`• Server is running on port ${envConfig.port}`);
});
