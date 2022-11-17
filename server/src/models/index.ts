const mongoose = require("mongoose");

import RoleModel from "./role.model";
import UserModel from "./user.model";
import TagModel from "./tag.model";
import ProjectModel from "./project.model";
import ColumnModel from "./column.model";
import CardModel from "./card.model";

mongoose.Promise = global.Promise;

const db = {
  user: UserModel,
  role: RoleModel,
  project: ProjectModel,
  tag: TagModel,
  column: ColumnModel,
  card: CardModel,
};

export default db;
