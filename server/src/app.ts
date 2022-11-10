import app from "./config/app.config";

import envConfig from "./config/environment.config";

app.listen(envConfig.port, () => {
  console.log(`Server is running on port ${envConfig.port}`);
});
