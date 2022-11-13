import { Request, Response } from "express";

import db from "../models";

const Project = db.project;
const Column = db.column;

const createColumn = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.body.projectId);
    if (!project) {
      res.status(404).send({ message: "Project not found" });
      return;
    }
    const newColumn = new Column(req.body);
    await newColumn.save();
    await Project.updateOne({
      $push: { columns: newColumn._id },
    });

    const columns = await Project.findById(req.body.projectId).populate(
      "columns"
    );

    res.status(200).send(columns);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const columnController = {
  createColumn,
};

export default columnController;
