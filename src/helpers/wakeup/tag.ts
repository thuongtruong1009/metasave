import { Error } from "mongoose";

import db from "../../models";

const tags: Array<string> = [
  "family",
  "work",
  "study",
  "hobby",
  "friend",
  "secret",
];

function initTag() {
  db.tag.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      tags.forEach((tag: string) => {
        new db.tag({
          name: tag,
        }).save((err: Error | null) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    }
  });
  console.log("-> seeding successfully for tags collection");
}

export default initTag;
