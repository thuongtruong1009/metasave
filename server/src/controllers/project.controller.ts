import { Request, Response } from "express";

import db from "../models";
const User = db.user;
const Project = db.project;

const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();

    const user = await User.findById(req.body.owner);

    await user?.updateOne({ $push: { projects: savedProject._id } });

    res.status(200).send(savedProject);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const author = await User.findById(req.body.ownerId, "_id username");

    const projects = await Project.find();
    res.status(200).send({ author: author, projects });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getPublicProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ access: "public" });
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await (
      await Project.findById(req.params.id)
    ).populate("owner", "_id username");
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteProject = async (req: Request, res: Response) => {
  try {
    await User.updateMany(
      { projects: req.params.id },
      { $pull: { projects: req.params.id } }
    );
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
