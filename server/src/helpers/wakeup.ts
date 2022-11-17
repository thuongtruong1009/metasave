import { Error } from "mongoose";

import db from "../models";

export const initRole = async (): Promise<void> => {
  await db.role.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      new db.role({
        name: "user",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new db.role({
        name: "moderator",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new db.role({
        name: "admin",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
  console.log("-> seeding successfully for roles collection");
};

export const initTag = async (): Promise<void> => {
  await db.tag.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      new db.tag({
        name: "family",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'family' to tag collection");
      });
      new db.tag({
        name: "work",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'family' to tag collection");
      });
      new db.tag({
        name: "study",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'family' to tag collection");
      });
      new db.tag({
        name: "hobby",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'family' to tag collection");
      });
      new db.tag({
        name: "friend",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'family' to tag collection");
      });
      new db.tag({
        name: "secret",
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'family' to tag collection");
      });
    }
  });
  console.log("-> seeding successfully for tags collection");
};
