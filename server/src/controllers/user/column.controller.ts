import { Request, Response } from "express";

import db from "../../models";

const Project = db.project;
const Column = db.column;
const Card = db.card;

const createColumn = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.body.projectId);
    if (!project) {
      res.status(404).send({ message: "Project not found" });
      return;
    }
    const newColumn = new Column(req.body);
    await newColumn.save();
    await Project.updateMany(
      { _id: req.body.projectId },
      {
        $push: { columns: newColumn._id },
      }
    );

    const columns = await Project.findById(
      req.body.projectId,
      "columns"
    ).populate("columns");

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
    if (!column) {
      res.status(404).send({ message: "Column not found" });
      return;
    }
    res.status(200).send(column);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateColumn = async (req: Request, res: Response): Promise<void> => {
  try {
    // await Column.updateOne({ _id: req.params.id }, { $set: req.body });
    const updated = await Column.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteColumn = async (req: Request, res: Response): Promise<void> => {
  try {
    await Project.updateMany(
      { columns: req.params.id },
      { $pull: { columns: req.params.id } }
    );
    await Card.deleteMany({ columnId: req.params.id });

    await Column.deleteOne({ _id: req.params.id });

    res.status(200).send({ message: "Column has been deleted!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const columnController = {
  createColumn,
  getAllColumns,
  getColumnById,
  updateColumn,
  deleteColumn,
};

export default columnController;
