import { Error } from "mongoose";

import db from "../models";

async function seedRole(): Promise<void> {
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
}

async function seedUser(): Promise<void> {
  await db.user.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      new db.user({
        username: "user",
        email: "user01@gmail.com",
        password: "user01",
        roles: ["user"],
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to users collection");
      });
      new db.user({
        username: "user02",
        email: "user02@gmail.com",
        password: "user02",
        roles: ["moderator"],
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to users collection");
      });
      new db.user({
        username: "admin",
        email: "user03",
        password: "user03",
        roles: ["admin"],
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to users collection");
      });
    }
  });
  console.log("-> seeding successfully for users collection");
}

async function seedTag(): Promise<void> {
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
}

async function seedProject(): Promise<void> {
  await db.project.estimatedDocumentCount((err: Error, count: number) => {
    if (!err && count === 0) {
      new db.project({
        name: "project01",
        description: "project01",
        tags: ["family", "work"],
        users: ["user01", "user02"],
      }).save((err: Error) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'project01' to project collection");
      });
    }
  });
  console.log("-> seeding successfully for projects collection");
}

const seedInitialData = {
  seedRole,
  // seedUser,
  seedTag,
  // seedProject,
};
export default seedInitialData;
