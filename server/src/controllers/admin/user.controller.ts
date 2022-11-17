import { Request, Response } from "express";

import db from "../../models";
const User = db.user;
const Role = db.role;

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("_id username email");
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const userController = {
  getAllUsers,
};
export default userController;
