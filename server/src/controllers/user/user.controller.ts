import { Request, Response } from "express";

import db from "../../models";
const User = db.user;
const Project = db.project;
const Column = db.column;
const Card = db.card;

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const findProjects = await Project.find({ owner: req.params.id });
    if (findProjects.length > 0) {
      // await Project.findByIdAndDelete({ owner: req.params.id });
      // await User.findByIdAndDelete(req.params.id);

      findProjects.forEach(async (project) => {
        const findColumns = await Column.find({ projectId: project._id });
        if (findColumns.length > 0) {
          findColumns.forEach(async (column) => {
            await Card.deleteMany({ columnId: column._id });
          });
          await Column.deleteMany({ projectId: project._id });
        }
        await Project.findByIdAndDelete(project._id);
      });
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
