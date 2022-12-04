import { Request, Response } from "express";
import CardModel from "../../models/card.model";

import db from "../../models";
const User = db.user;
const Project = db.project;
const Board = db.board;
const Card = db.card;

const createProject = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.body.owner);
    console.log("okee re", req.user);
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    if (req.user.id !== req.body.owner) {
      res.status(403).send({ message: "Forbiden" });
      return;
    }

    const project = new Project(req.body);
    const savedProject = await project.save();

    await User.updateMany(
      { _id: req.user.id },
      { $push: { projects: savedProject._id } }
    );

    res.status(201).send(savedProject);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getAllProjects = async (req: any, res: Response): Promise<void> => {
  try {
    let access: string =
      req.query.access && req.query.access === "private"
        ? req.query.access
        : "public";

    const total = await Project.countDocuments({
      owner: req.user.id,
      access: access,
    });
    const projects = await Project.find(
      {
        owner: req.user.id,
        access: access,
      },
      "_id props members isFavorite name access category createdAt",
      { sort: { createdAt: -1 } }
    );
    res.status(200).send({ total, projects });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "owner",
      "_id username"
    );
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
    const findBoards = await Board.find({ projectId: req.params.id });
    if (findBoards.length > 0) {
      findBoards.forEach(async (Board) => {
        await Card.deleteMany({ boardId: Board._id });
      });
      await Board.deleteMany({ projectId: req.params.id });
    }

    await Project.findByIdAndDelete(req.params.id);

    await User.updateMany(
      { projects: req.params.id },
      { $pull: { projects: req.params.id } }
    );
    res.status(200).send("Project has been deleted!");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const projectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};

export default projectController;
