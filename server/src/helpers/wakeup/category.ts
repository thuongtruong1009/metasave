import { Error } from "mongoose";

import db from "../../models";

const categories: Array<string> = ["todo", "kanban", "calendar"];

function initCategory() {
  db.category.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      categories.forEach((category: string) => {
        new db.category({
          name: category,
        }).save((err: Error | null) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    }
  });
  console.log("-> seeding successfully for category collection");
}

export default initCategory;
