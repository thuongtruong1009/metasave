const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db: any = {};

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["USER", "ADMIN", "MODERATOR"];

export default db;
