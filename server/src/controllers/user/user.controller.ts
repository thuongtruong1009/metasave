import { Request, Response } from "express";

import db from "../../models";
const User = db.user;
const Project = db.project;

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const containsProjects = await Project.find({ owner: req.params.id });
    if (containsProjects.length > 0) {
      await Project.findByIdAndDelete({ owner: req.params.id });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User account has been deleted!");
    } else {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User account has been deleted!");
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const userController = {
  deleteUser,
};

export default userController;
