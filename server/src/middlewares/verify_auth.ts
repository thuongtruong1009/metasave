import { Request, Response } from "express";
import { Error } from "mongoose";
import { IDecoded, INext, IRole, IUser } from "../types";
const jwt = require("jsonwebtoken");
const config = require("../config/environment.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const verifyToken = (req: any, res: Response, next: INext) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err: Error, decoded: IDecoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req: any, res: Response, next: INext) => {
  User.findById(req.userId).exec((err: Error, user: IUser) => {
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

const isModerator = (req: any, res: Response, next: any) => {
  User.findById(req.userId).exec((err: Error, user: IUser) => {
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
  verifyToken,
  isAdmin,
  isModerator,
};

export default verifyAuth;
