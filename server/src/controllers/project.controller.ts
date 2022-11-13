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
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const projectController = {
  createProject,
  getAllProjects,
};

export default projectController;
