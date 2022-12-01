import { Request, Response } from "express";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

import { hashPassword, comparePassword } from "../../helpers/hash";
import { IRole, IUser } from "../../types";

import db from "../../models";
const User = db.user;
const Role = db.role;

const signup = async (req: Request, res: Response) => {
  let key = await hashPassword(req.body.password);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    avatar: req.body.avatar,
    password: key.hash,
    salt: key.salt,
  });

  user.save((err: Error, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err: Error, roles: Array<IRole>) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role: IRole) => role._id);
          user.save((err: Error) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
          sendConfirmationEmail(user.email);
        }
      );
    } else {
      Role.findOne(
        {
          name: "user",
        },
        (err: Error, role: IRole) => {
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
          sendConfirmationEmail(user.email);
        }
      );
    }
  });
};

//https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
function sendConfirmationEmail(email: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  } as any);

  let token = jwt.sign({ email }, process.env.SECRET_KEY);

  const urlConfirm = `${process.env.APP_URL}/api/auth/verify/${token}`;

  return transporter.sendMail(
    {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Confirm your email",
      html: `<p>Confirm your Metasave account at : <a href="${urlConfirm}">Confirm</a></p>`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );
}

const verifyAccount = (req: Request, res: Response) => {
  var email = null;
  try {
    const payload = jwt.verify(req.params.token, process.env.SECRET_KEY) as any;
    email = payload.email;
  } catch {
    throw new Error("Invalid Token");
  }
  User.findOne({ email: email }, (err: Error, user: IUser | any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.isVerified) {
      res.status(500).send({ message: "Account already verified" });
      return;
    }
    user.isVerified = true;
    user.save((err: Error) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Account verified" });
    });
  });
};

const signin = (req: Request, res: Response) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err: Error, user: IUser | any) => {
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
      var token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRET_KEY,
        {
          expiresIn: 86400,
        }
      );
      var authorities: string[] = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        avatar: user.avatar,
        roles: authorities,
        accessToken: token,
      });
    });
};

const authController = {
  signup,
  verifyAccount,
  signin,
};

export default authController;
