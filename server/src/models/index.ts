const mongoose = require("mongoose");

import RoleModel from "./role.model";
import UserModel from "./user.model";
import TagModel from "./tag.model";
import ProjectModel from "./project.model";
import ColumnModel from "./column.model";

import { EROLE, ETAG, ECATEGORY } from "../constant";

mongoose.Promise = global.Promise;

const db = {
  ROLES: EROLE,
  TAGS: ETAG,
  CATEGORIES: ECATEGORY,

  user: UserModel,
  role: RoleModel,
  project: ProjectModel,
  tag: TagModel,
  column: ColumnModel,
};

export default db;
