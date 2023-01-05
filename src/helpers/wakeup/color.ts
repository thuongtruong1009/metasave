import { Error } from "mongoose";

import db from "../../models";

const colors: Array<string> = [
  "#FFDCA2",
  "#E4C7B7",
  "#BCE6FF",
  "#F9E2AE",
  "#E8B7D4",
  "#DDDDDA",
  "#E0ECDE",
  "#FFCAD4",
  "#CFF4D2",
  "#F5CEC7",
];

function initColor() {
  db.color.estimatedDocumentCount((err: Error | null, count: number) => {
    if (!err && count === 0) {
      colors.forEach((color: string) => {
        new db.color({
          name: `${color}`,
        }).save((err: Error | null) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    }
  });
  console.log("-> seeding successfully for color collection");
}

export default initColor;
