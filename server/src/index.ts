import App from "./configs/app.config";

import StatisticalRouter from "./routes/admin/statistical.router";
import UsersRouter from "./routes/admin/user.router";
import TagsRouter from "./routes/admin/tag.router";

import AuthRouter from "./routes/user/auth.router";
import ProfileRouter from "./routes/user/profile.router";
import ProjectRouter from "./routes/user/project.router";
import ColumnRouter from "./routes/user/column.router";
import CardRouter from "./routes/user/card.router";

const app = new App([
  new StatisticalRouter(),
  new UsersRouter(),
  new TagsRouter(),

  new AuthRouter(),
  new ProfileRouter(),
  new ProjectRouter(),
  new ColumnRouter(),
  new CardRouter(),
]);

app.listen();
