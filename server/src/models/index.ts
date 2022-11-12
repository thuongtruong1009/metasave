const mongoose = require("mongoose");

import UserModel from "./user.model";
import RoleModel from "./role.model";
import ProjectModel from "./project.model";
import ColumnModel from "./column.model";
import CardModel from "./card.model";

mongoose.Promise = global.Promise;

const db = {
  user: UserModel,
  role: RoleModel,
  ROLES: ["USER", "ADMIN", "MODERATOR"],
  project: ProjectModel,
  column: ColumnModel,
  card: CardModel,
};

export default db;
