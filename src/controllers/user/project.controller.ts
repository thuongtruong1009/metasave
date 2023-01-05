import { Request, Response } from "express";
import CardModel from "../../models/card.model";

import db from "../../models";
const User = db.user;
const Project = db.project;
const Board = db.board;
const Card = db.card;

const createProject = async (req: any, res: Response): Promise<void> => {
  try {
    const project = new Project({ owner: req.user.id, ...req.body });
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
    let access: string = req.query.access;

    if (access === "all") {
      const total = await Project.countDocuments({
        owner: req.user.id,
      });
      const projects = await Project.find(
        {
          owner: req.user.id,
        },
        "_id props members isFavorite name access categoryId createdAt",
        { sort: { createdAt: -1 }, skip: 0, limit: req.query.limit }
      );
      const lastUpdated = await Project.find(
        {
          owner: req.user.id,
        },
        "updatedAt",
        { sort: { createdAt: -1 }, limit: 1 }
      );
      res.status(200).send({ total, lastUpdated, projects });
      return;
    }

    const total = await Project.countDocuments({
      owner: req.user.id,
      access: access,
    });
    const projects = await Project.find(
      {
        owner: req.user.id,
        access: access,
      },
      "_id props members isFavorite name access categoryId createdAt",
      { sort: { createdAt: -1 }, skip: 0, limit: req.query.limit }
    );
    const lastUpdated = await Project.find(
      {
        owner: req.user.id,
        access: access,
      },
      "updatedAt",
      { sort: { createdAt: -1 }, limit: 1 }
    );
    res.status(200).send({ total, lastUpdated, projects });
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
