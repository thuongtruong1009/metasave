const mongoose = require("mongoose");

import UserModel from "./user.model";
import RoleModel from "./role.model";

mongoose.Promise = global.Promise;

type IDb =
  | {
      user: any;
      role: any;
      ROLES: string[];
    }
  | any;

const db: IDb = {
  user: UserModel,
  role: RoleModel,
};

db.ROLES = ["USER", "ADMIN", "MODERATOR"];

export default db;
