import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import { IUser } from "../types";
import { EROLE } from "../constants";

import db from "../models";

const User = db.user;
const ROLES = EROLE;

const checkDuplicateUsernameOrEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.findOne({
    username: req.body.username,
  }).exec((err: Error | null, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    User.findOne({
      email: req.body.email,
    }).exec((err: Error | null, user: IUser | any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist! `,
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

export default verifySignUp;
