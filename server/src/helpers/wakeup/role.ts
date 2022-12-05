import { Error } from "mongoose";

import db from "../../models";

const roles: Array<string> = ["user", "moderator", "admin"];

function initRole() {
  db.role.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      roles.forEach((role: string) => {
        new db.role({
          name: role,
        }).save((err: Error | null) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    }
  });
  console.log("-> seeding successfully for roles collection");
}

export default initRole;
