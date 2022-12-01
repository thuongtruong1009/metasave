import { Response, NextFunction } from "express";
import { Error } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { IDecoded, IRole, IUser } from "../types";
import jwt from "jsonwebtoken";

import db from "../models";
const User = db.user;
const Role = db.role;

const getUserId = (req: any) => {
  let token = req.headers["authorization"];
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()).id;
};

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .send({ status: false, message: "No token provided!" });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err: Error, decoded: IDecoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  });
};

const isAdmin = (req: any, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err: Error, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err: Error, roles: Array<IRole>) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

const isModerator = (req: any, res: Response, next: NextFunction) => {
  User.findById(req.userId).exec((err: Error, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err: Error, roles: Array<IRole>) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

const verifyAuth = {
  getUserId,
  verifyToken,
  isAdmin,
  isModerator,
};

export default verifyAuth;
