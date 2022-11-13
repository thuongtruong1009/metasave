import { Request, Response } from "express";
import ColumnModel from "src/models/column.model";

import db from "../models";
const User = db.user;
const Project = db.project;
const Column = db.column;

const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.body.owner);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    const project = new Project(req.body);
    const savedProject = await project.save();
    await user.updateOne({ $push: { projects: savedProject._id } });

    res.status(200).send(savedProject);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().populate("owner", "_id username");
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getPublicProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await Project.find({ access: "public" });
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await (
      await Project.findById(req.params.id)
    ).populate("owner", "_id username");
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    await User.updateMany(
      { projects: req.params.id },
      { $pull: { projects: req.params.id } }
    );
    await Column.deleteMany({ projectId: req.params.id });
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).send("Project has been deleted!");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const projectController = {
  createProject,
  getAllProjects,
  getProjectById,
  getPublicProjects,
  updateProject,
  deleteProject,
};

export default projectController;
