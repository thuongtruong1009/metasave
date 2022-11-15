import { Request, Response } from "express";

import db from "../../models";
const User = db.user;

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select("_id username email roles")
      .populate("roles", "name");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userController = {
  getAllUsers,
};
export default userController;
