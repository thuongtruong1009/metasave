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

const getAllColumns = async (req: Request, res: Response): Promise<void> => {
  try {
    const columns = await Project.findById(
      req.params.projectId,
      "columns"
    ).populate("columns");
    res.status(200).send(columns);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getColumnById = async (req: Request, res: Response): Promise<void> => {
  try {
    const column = await Column.findById(req.params.id);
    res.status(200).send(column);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateColumn = async (req: Request, res: Response): Promise<void> => {
  try {
    const column = await Column.findById(req.body.columnId);
    if (!column) {
      res.status(404).send({ message: "Column not found" });
      return;
    }

    const updated = await Column.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const columnController = {
  createColumn,
  getAllColumns,
  getColumnById,
  updateColumn,
};

export default columnController;
