import config from "../config/auth.config";
import db from "../models";
const User = db.user;
const Role = db.role;

import jwt from "jsonwebtoken";

import { hashPassword, comparePassword } from "../helpers/hash";

const signup = async (req: any, res: any) => {
  let key = await hashPassword(req.body.password);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: key.hash,
    salt: key.salt,
  });

  user.save((err: any, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err: any, roles: any) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role: any) => role._id);
          user.save((err: any) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne(
        {
          name: "user",
        },
        (err: any, role: any) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = [role._id];

          user.save((err: any) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    }
  });
};

const signin = (req: any, res: any) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err: any, user: any) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = comparePassword(
        req.body.password,
        user.password,
        user.salt
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });
      var authorities: string[] = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

const authController = {
  signup,
  signin,
};

export default authController;
