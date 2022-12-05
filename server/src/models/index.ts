import mongoose from "mongoose";

import RoleModel from "./role.model";
import UserModel from "./user.model";
import TagModel from "./tag.model";
import ProjectModel from "./project.model";
import BoardModel from "./board.model";
import CardModel from "./card.model";
import ColorModel from "./color.model";
import CategoryModel from "./category.model";

mongoose.Promise = global.Promise;

const db: any = {
  user: UserModel,
  role: RoleModel,
  project: ProjectModel,
  tag: TagModel,
  board: BoardModel,
  card: CardModel,
  color: ColorModel,
  category: CategoryModel,
};

export default db;
