import { unlink } from "node:fs/promises";
import { Request, Response } from "express";

import db from "../../models";
const User = db.user;
const Project = db.project;
const Board = db.board;
const Card = db.card;
const Color = db.color;
const Tag = db.tag;

const uploadSingleResource = async (req: any, res: Response) => {
  try {
    res.status(200).send(req.file.filename);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteResource = async (req: Request, res: Response) => {
  try {
    await unlink(req.body.dest);
    res.status(200).send("File deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const findProjects = await Project.find({ owner: req.params.id });
    if (findProjects.length > 0) {
      // await Project.findByIdAndDelete({ owner: req.params.id });
      // await User.findByIdAndDelete(req.params.id);

      findProjects.forEach(async (project) => {
        const findBoards = await Board.find({ projectId: project._id });
        if (findBoards.length > 0) {
          findBoards.forEach(async (Board) => {
            await Card.deleteMany({ BoardId: Board._id });
          });
          await Board.deleteMany({ projectId: project._id });
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

const getColorCollection = async (req: Request, res: Response) => {
  try {
    const colors = await Color.find();
    res.status(200).send(colors);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTagCollection = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find().populate("color", "-__v").select("-__v");
    res.status(200).send(tags);
  } catch (error) {
    res.status(500).send(error);
  }
};

const settingController = {
  uploadSingleResource,
  deleteResource,
  deleteUser,
  getColorCollection,
  getTagCollection,
};

export default settingController;
